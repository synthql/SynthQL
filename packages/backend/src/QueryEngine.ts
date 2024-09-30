import { Query, QueryResult, Table } from '@synthql/queries';
import { Pool } from 'pg';
import { QueryPlan, collectLast } from '.';
import { QueryProvider } from './QueryProvider';
import { SynthqlError } from './SynthqlError';
import { execute } from './execution/execute';
import { PgExecutor } from './execution/executors/PgExecutor';
import { composeQuery } from './execution/executors/PgExecutor/composeQuery';
import { QueryProviderExecutor } from './execution/executors/QueryProviderExecutor';
import { QueryExecutor } from './execution/types';
import { generateLast } from './util/generators/generateLast';

export interface QueryEngineProps<DB> {
    /**
     * The database connection string e.g. `postgresql://user:password@localhost:5432/db`.
     *
     * If you use this option, SynthQL will create a conection pool for you internally.
     */
    url?: string;
    /**
     * The name of the database schema to
     * execute your SynthQL queries against.
     *
     * e.g `public`
     */
    schema?: string;
    /**
     * An optional SQL statement that will be sent before every SynthQL query.
     *
     * e.g `SELECT version();`
     */
    prependSql?: string;
    /**
     * A list of providers that you want to be used
     * to execute your SynthQL queries against.
     *
     * e.g:
     *
     * ```ts
     *      const films = [{
     *          film_id: 1
     *      }, {
     *          film_id: 2
     *      }];
     *
     *      const filmIds = [1, 2, 3];
     *
     *      const filmProvider = {
     *          table: 'film',
     *          execute: async ({ film_id: filmIds }): Promise<{ film_id: number }[]> => {
     *              return films.filter((f) => filmIds.includes(f.film_id));
     *          },
     *      };
     * ```
     */
    providers?: Array<QueryProvider<DB, Table<DB>>>;
    /**
     * The connection pool to which the executor will send SQL queries to.
     *
     * You can use this instead of passing a connection string.
     */
    pool?: Pool;

    /**
     * Whether to log SQL statements or not.
     */
    logging?: boolean;

    /**
     * The rate at which rows are sampled for runtime type validation.
     *
     * Defaults to 0, meaning no validation will be performed.
     */
    runtimeValidationSampleRate?: number;
}

export class QueryEngine<DB> {
    private pool: Pool;
    private schema: string;
    private prependSql?: string;
    private executors: Array<QueryExecutor> = [];
    private runtimeValidationSampleRate: number;

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
                logging: config.logging,
            }),
        ];
        this.runtimeValidationSampleRate =
            config.runtimeValidationSampleRate ?? 0;
    }

    execute<TQuery extends Query>(
        query: TQuery,
        opts?: {
            /**
             * The name of the database schema to execute
             * your SynthQL query against
             *
             * e.g `public`
             */
            schema?: string;
            /**
             * If true, the query result generator will wait for query
             * execution completion, and then return only the last result
             */
            returnLastOnly?: boolean;
        },
    ): AsyncGenerator<QueryResult<TQuery>> {
        const gen = execute<TQuery>(query, {
            executors: this.executors,
            defaultSchema: opts?.schema ?? this.schema,
            prependSql: this.prependSql,
            runtimeValidationSampleRate: this.runtimeValidationSampleRate,
        });

        if (opts?.returnLastOnly) {
            return generateLast(gen);
        }

        return gen;
    }

    async executeAndWait<TTable extends Table<DB>, TQuery extends Query>(
        query: TQuery,
        opts?: {
            /**
             * The name of the database schema to execute
             * your SynthQL query against
             *
             * e.g `public`
             */
            schema?: string;
        },
    ): Promise<QueryResult<TQuery>> {
        return await collectLast(
            generateLast(
                execute<TQuery>(query, {
                    executors: this.executors,
                    defaultSchema: opts?.schema ?? this.schema,
                    prependSql: this.prependSql,
                }),
            ),
        );
    }

    compile<T extends Query>(
        query: T,
    ): {
        sql: string;
        params: any[];
    } {
        const { sqlBuilder } = composeQuery({
            defaultSchema: this.schema,
            query,
        });

        return sqlBuilder.build();
    }

    async explain<TTable extends Table<DB>>(query: Query): Promise<QueryPlan> {
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
