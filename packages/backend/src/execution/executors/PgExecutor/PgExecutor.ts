import { AnyQuery } from '@synthql/queries';
import { Pool, PoolClient, types } from 'pg';
import { format } from 'sql-formatter';
import { splitQueryAtBoundary } from '../../../query/splitQueryAtBoundary';
import { QueryExecutor } from '../../types';
import { QueryProviderExecutor } from '../QueryProviderExecutor';
import { composeQuery } from './composeQuery';
import { hydrate } from './hydrate';
import { SynthqlError } from '../../../SynthqlError';

// Use the OIDs imported from pg.types to set custom type parsers
types.setTypeParser(types.builtins.DATE, (value) => value);
types.setTypeParser(types.builtins.TIMESTAMP, (value) => value);
types.setTypeParser(types.builtins.TIMESTAMPTZ, (value) => value);

type PgQueryResult = {
    [key: string]: any;
};

interface PgExecutorProps {
    qpe?: QueryProviderExecutor;
    defaultSchema: string;
    /**
     * The pool to which the executor will send SQL queries to.
     */
    pool: Pool;
    /**
     * Whether to log SQL statements or not.
     */
    logging?: boolean;
    /**
     * An SQL statement that will be sent before every SynthQL query.
     *
     * e.g `SET search_path TO "public";`
     */
    prependSql?: string;
}

export class PgExecutor implements QueryExecutor<PgQueryResult> {
    constructor(private props: PgExecutorProps) {}

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

    async execute(
        query: AnyQuery,
        { defaultSchema }: { defaultSchema: string },
    ): Promise<Array<PgQueryResult>> {
        return executeInsidePool(this.props.pool, async (client) => {
            await this.safeExecutePrependSql(client);

            return this.executeQuery({ client, defaultSchema, query });
        });
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

    async safeExecutePrependSql(client: PoolClient) {
        const prependSql = this.props.prependSql;

        if (!prependSql) {
            return;
        }

        try {
            if (this.props.logging) {
                console.log(format(prependSql, { language: 'postgresql' }));
            }

            await client.query(prependSql);
        } catch (err) {
            throw SynthqlError.createPrependSqlExecutionError({
                error: err,
                prependSql,
            });
        }
    }

    async executeQuery({
        defaultSchema,
        query,
        client,
    }: {
        query: AnyQuery;
        defaultSchema: string;
        client: PoolClient;
    }) {
        const { sqlBuilder, augmentedQuery } = composeQuery({
            defaultSchema,
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
}

async function executeInsidePool<T>(
    pool: Pool,
    fn: (client: PoolClient) => Promise<T>,
): Promise<T> {
    const client = await connectToPool(pool);

    try {
        return fn(client);
    } finally {
        client?.release();
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
