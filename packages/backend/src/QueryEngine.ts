import { Pool } from 'pg';
import { Query, QueryResult, Table } from '@synthql/queries';
import { composeQuery } from './execution/executors/PgExecutor/composeQuery';
import { QueryPlan } from '.';
import { QueryProvider } from './QueryProvider';
import { execute } from './execution/execute';
import { QueryExecutor } from './execution/types';
import { QueryProviderExecutor } from './execution/executors/QueryProviderExecutor';
import { PgExecutor } from './execution/executors/PgExecutor';
import { SqlExecutionError } from './execution/executors/SqlExecutionError';
import { generateLast } from './util/generators/generateLast';

export interface QueryEngineProps<DB> {
    url?: string;
    schema?: string;
    providers?: Array<QueryProvider<DB, Table<DB>>>;
    pool?: Pool;
}

export class QueryEngine<DB> {
    private pool: Pool;
    private schema: string;
    private executors: Array<QueryExecutor> = [];

    constructor(private config: QueryEngineProps<DB>) {
        this.schema = config.schema ?? 'public';
        this.pool =
            config.pool ??
            new Pool({
                connectionString: config.url,
                max: 10,
            });

        const qpe = new QueryProviderExecutor(config.providers ?? []);
        this.executors = [
            qpe,
            new PgExecutor({
                pool: this.pool,
                defaultSchema: this.schema,
                qpe,
            }),
        ];
    }

    execute<TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(
        query: TQuery,
        opts?: {
            schema?: string;
            /**
             * If true, the generator will only return the last result.
             */
            returnLastOnly?: boolean;
        },
    ): AsyncGenerator<QueryResult<DB, TQuery>> {
        const gen = execute<DB, TQuery>(query, {
            executors: this.executors,
            defaultSchema: opts?.schema ?? this.schema,
        });
        if (opts?.returnLastOnly) {
            return generateLast(gen);
        }

        return gen;
    }

    compile<T>(query: T extends Query<DB, infer TTable> ? T : never): {
        sql: string;
        params: any[];
    } {
        const { sqlBuilder } = composeQuery({
            defaultSchema: this.schema,
            query,
        });

        return sqlBuilder.build();
    }

    async explain<TTable extends Table<DB>>(
        query: Query<DB, TTable>,
    ): Promise<QueryPlan> {
        const { sqlBuilder } = composeQuery({
            defaultSchema: this.schema,
            query,
        });

        const { params, sql } = sqlBuilder.build();

        const explainQuery: string = `explain (analyze, buffers, verbose, settings, format json) ${sql}`;

        try {
            const result = await this.pool.query(explainQuery, params);
            return result.rows[0]['QUERY PLAN'][0];
        } catch (err) {
            throw new SqlExecutionError({
                err,
                params,
                sql,
                query,
            });
        }
    }
}

export class SynthqlError extends Error {
    constructor(
        public sql: string,
        public json: any,
        err: Error | any,
    ) {
        super(err?.message);
    }

    createConnectionError({ error }: { error: any }) {}
    createSqlError({ error, sql }: { error: any; sql: string }) {}
    createJsonParsingError({ error, json }: { error: any; json: any }) {}
}
