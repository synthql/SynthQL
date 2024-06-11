import { Pool, PoolClient } from 'pg';
import { format } from 'sql-formatter';
import { splitQueryAtBoundary } from '../../../query/splitQueryAtBoundary';
import { ColumnRef } from '../../../refs/ColumnRef';
import { RefContext, createRefContext } from '../../../refs/RefContext';
import { AnyQuery } from '../../../types';
import { QueryExecutor } from '../../types';
import { QueryProviderExecutor } from '../QueryProviderExecutor';
import { composeQuery } from './composeQuery';
import { hydrate } from './hydrate';
import { SynthqlError } from '../../../SynthqlError';

type PgQueryResult = {
    [key: string]: any;
};

interface PgExecutorProps {
    qpe?: QueryProviderExecutor;
    defaultSchema: string;
    pool: Pool;
    logging?: boolean;
}

export class PgExecutor implements QueryExecutor<PgQueryResult> {
    private client: Promise<PoolClient>;

    constructor(private props: PgExecutorProps) {
        this.client = connectToPool(props.pool);
    }

    compile(query: AnyQuery) {
        const { sqlBuilder } = composeQuery({
            query,
            defaultSchema: this.props.defaultSchema,
        });
        const { sql, params } = sqlBuilder.build();

        return {
            sql: format(sql, { language: 'postgresql' }),
            params,
        };
    }

    async execute(query: AnyQuery): Promise<Array<PgQueryResult>> {
        const client = await this.client;
        const { sqlBuilder, augmentedQuery } = composeQuery({
            defaultSchema: this.props.defaultSchema,
            query,
        });
        const { params, sql } = sqlBuilder.build();

        try {
            if (this.props.logging) {
                console.log(format(sql, { language: 'postgresql' }));
            }

            const queryResult = await client.query(sql, params);
            const rows = queryResult.rows;

            return hydrate(rows, augmentedQuery) as Array<PgQueryResult>;
        } catch (err) {
            throw SynthqlError.createSqlExecutionError({
                error: err,
                props: { params, sql, query },
            });
        }
    }

    canExecute<TQuery extends AnyQuery>(
        query: TQuery,
    ): { query: TQuery; remaining: TQuery[] } | undefined {
        const { qpe } = this.props;

        if (qpe?.canExecute(query)) {
            return undefined;
        }

        const shouldSplit = (
            q: TQuery,
            { depth }: { depth: number },
        ): boolean => {
            const isProviderQuery = Boolean(qpe?.canExecute(q));
            const isLazyQuery = Boolean(q.lazy);

            if (depth >= 2) {
                return true;
            }

            return isProviderQuery || isLazyQuery;
        };

        return splitQueryAtBoundary(query, shouldSplit);
    }

    collectRefValues(row: any, columns: ColumnRef[]): RefContext {
        const refContext = createRefContext();

        for (const column of columns) {
            const value = row[column.column];
            refContext.addValues(column, value);
        }

        return refContext;
    }
}

function connectToPool(pool: Pool): Promise<PoolClient> {
    try {
        return pool.connect();
    } catch (error) {
        throw SynthqlError.createDatabaseConnectionError({
            error,
        });
    }
}
