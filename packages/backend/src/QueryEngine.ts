import { Pool } from 'pg';
import {
    AnyQuery,
    Query,
    QueryResult,
    RegisteredQueryRequestBody,
    Table,
} from '@synthql/queries';
import { composeQuery } from './execution/executors/PgExecutor/composeQuery';
import { QueryPlan, collectLast } from '.';
import { QueryProvider } from './QueryProvider';
import { execute } from './execution/execute';
import { QueryExecutor } from './execution/types';
import { QueryProviderExecutor } from './execution/executors/QueryProviderExecutor';
import { PgExecutor } from './execution/executors/PgExecutor';
import { generateLast } from './util/generators/generateLast';
import { SynthqlError } from './SynthqlError';
import { QueryStore } from './QueryStore';

export interface QueryEngineProps<DB> {
    /**
     * The database connection string.
     * e.g. `postgresql://user:password@localhost:5432/db`.
     *
     * If you use this option, SynthQL will create
     * a conection pool for you internally.
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
     * If true, the executor will execute queries that have not
     * been registered via `QueryEngine.registerQueries()`.
     */
    dangerouslyAllowUnregisteredQueries?: boolean;
    /**
     * An optional SQL statement that will
     * be sent before every SynthQL query.
     *
     * e.g `SELECT version();`
     */
    prependSql?: string;
    /**
     * A list of providers that you want to
     * execute your SynthQL queries against.
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
     * The connection pool to which the
     * executor will send SQL queries to.
     *
     * You can use this instead of
     * passing a connection string.
     */
    pool?: Pool;

    /**
     * Whether to log SQL statements or not.
     */
    logging?: boolean;
}

export class QueryEngine<DB> {
    private pool: Pool;
    private schema: string;
    private dangerouslyAllowUnregisteredQueries: boolean;
    private prependSql?: string;
    private queryStore: QueryStore;
    private executors: Array<QueryExecutor> = [];

    constructor(config: QueryEngineProps<DB>) {
        this.pool =
            config.pool ??
            new Pool({
                connectionString: config.url,
                max: 10,
            });
        this.schema = config.schema ?? 'public';
        this.dangerouslyAllowUnregisteredQueries =
            config.dangerouslyAllowUnregisteredQueries ?? false;
        this.prependSql = config.prependSql;

        this.queryStore = new QueryStore();

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

    execute<TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(
        query: TQuery,
        opts?: {
            /**
             * The name of the database schema to
             * execute your SynthQL query against
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
    ): AsyncGenerator<QueryResult<DB, TQuery>> {
        if (!this.dangerouslyAllowUnregisteredQueries) {
            if (!query.hash) {
                throw SynthqlError.createQueryMissingHashError({
                    query,
                });
            }

            const hasQueryFn = this.queryStore.has(query.hash);

            if (!hasQueryFn) {
                throw SynthqlError.createQueryNotRegisteredError({
                    queryId: query.hash,
                });
            }
        }

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
             * The name of the database schema to
             * execute your SynthQL query against
             *
             * e.g `public`
             */
            schema?: string;
        },
    ): Promise<QueryResult<DB, TQuery>> {
        return collectLast(
            this.execute(query, {
                schema: opts?.schema ?? this.schema,
                returnLastOnly: true,
            }),
        );
    }

    executeRegisteredQuery<
        TTable extends Table<DB>,
        TQuery extends Query<DB, TTable>,
    >(
        { queryId, params }: RegisteredQueryRequestBody,
        opts?: {
            /**
             * The name of the database schema to
             * execute your SynthQL query against
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
    ): AsyncGenerator<QueryResult<DB, TQuery>> {
        const query = this.queryStore.get({
            queryId,
            params,
        });

        return this.execute<TTable, TQuery>(query as TQuery, {
            schema: opts?.schema ?? this.schema,
            returnLastOnly: true,
        });
    }

    executeRegisteredQueryAndWait<
        TTable extends Table<DB>,
        TQuery extends Query<DB, TTable>,
    >(
        { queryId, params }: RegisteredQueryRequestBody,
        opts?: {
            /**
             * The name of the database schema to
             * execute your SynthQL query against
             *
             * e.g `public`
             */
            schema?: string;
        },
    ): Promise<QueryResult<DB, TQuery>> {
        return collectLast(
            this.executeRegisteredQuery<TTable, TQuery>(
                { queryId, params },
                {
                    schema: opts?.schema ?? this.schema,
                    returnLastOnly: true,
                },
            ),
        );
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

    registerQueries(queries: Array<AnyQuery>) {
        for (const query of queries) {
            this.queryStore.set(query);
        }
    }
}
