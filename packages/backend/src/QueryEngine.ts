import { Pool } from 'pg';
import { Query, QueryResult, Table } from '@synthql/queries';
import { composeQuery } from './execution/executors/PgExecutor/composeQuery';
import { QueryPlan, collectLast } from '.';
import { QueryProvider } from './QueryProvider';
import { execute } from './execution/execute';
import { QueryExecutor } from './execution/types';
import { QueryProviderExecutor } from './execution/executors/QueryProviderExecutor';
import { PgExecutor } from './execution/executors/PgExecutor';
import { generateLast } from './util/generators/generateLast';
import { SynthqlError } from './SynthqlError';

export interface QueryEngineProps<DB> {
    url?: string;
    schema?: string;
    prependSql?: string;
    providers?: Array<QueryProvider<DB, Table<DB>>>;
    pool?: Pool;
}

export class QueryEngine<DB> {
    private pool: Pool;
    private schema: string;
    private prependSql?: string;
    private executors: Array<QueryExecutor> = [];

    constructor(config: QueryEngineProps<DB>) {
        this.schema = config.schema ?? 'public';
        this.prependSql = config.prependSql;
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
                prependSql: this.prependSql,
            }),
        ];
    }

    execute<TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(
        query: TQuery,
        opts?: {
            /**
             * The name of the database schema to execute
             * your SynthQL query against e.g `public`
             */
            schema?: string;
            /**
             * If true, the query result generator will wait for query
             * execution completion, and then return only the last result
             */
            returnLastOnly?: boolean;
        },
    ): AsyncGenerator<QueryResult<DB, TQuery>> {
        const gen = execute<DB, TQuery>(query, {
            executors: this.executors,
            defaultSchema: opts?.schema ?? this.schema,
            prependSql: this.prependSql,
        });

        if (opts?.returnLastOnly) {
            return generateLast(gen);
        }

        return gen;
    }

    async executeAndWait<
        TTable extends Table<DB>,
        TQuery extends Query<DB, TTable>,
    >(
        query: TQuery,
        opts?: {
            /**
             * The name of the database schema to execute
             * your SynthQL query against e.g `public`
             */
            schema?: string;
        },
    ): Promise<QueryResult<DB, TQuery>> {
        return await collectLast(
            generateLast(
                execute<DB, TQuery>(query, {
                    executors: this.executors,
                    defaultSchema: opts?.schema ?? this.schema,
                    prependSql: this.prependSql,
                }),
            ),
        );
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
            throw SynthqlError.createSqlExecutionError({
                error: err,
                props: { params, sql, query },
            });
        }
    }
}
