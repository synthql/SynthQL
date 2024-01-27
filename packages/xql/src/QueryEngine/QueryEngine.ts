import {
    CompiledQuery,
    Kysely,
    PostgresDialect,
    SelectQueryBuilder,
} from 'kysely';
import { Pool } from 'pg';
import { Query, QueryPlan, QueryResult, Table } from '../types';
import { composeQuery } from './composeQuery';
import { hydrate } from './hydrate';

export interface QueryProvider<DB, TTable extends Table<DB>> {
    table: TTable;
    execute: <TQuery extends Query<DB, TTable>>(
        query: TQuery,
    ) => Promise<QueryResult<DB, TQuery>>;
}

export interface QueryEngineProps<DB> {
    url?: string;
    schema?: string;
    providers?: Array<QueryProvider<DB, any>>;
    pool?: Pool;
}

export class QueryEngine<DB> {
    private dialect: PostgresDialect;
    private db: Kysely<DB>;
    private pool: Pool;
    private schema: string;
    constructor(config: QueryEngineProps<DB>) {
        this.schema = config.schema ?? 'public';
        this.pool =
            config.pool ??
            new Pool({
                connectionString: config.url,
                max: 10,
            });
        this.dialect = new PostgresDialect({
            pool: this.pool,
        });
        this.db = new Kysely({ dialect: this.dialect });
    }

    async *execute<TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(
        query: TQuery,
        opts?: { schema?: string },
    ): AsyncGenerator<QueryResult<DB, TQuery>> {
        const defaultSchema = opts?.schema ?? this.schema;
        const { kQuery, rootQuery } = composeQuery({
            defaultSchema,
            db: this.db,
            query,
        });

        const databaseResults = await this.tryToExecute(kQuery);

        yield hydrate(databaseResults, rootQuery) as QueryResult<DB, TQuery>;
    }

    compile<T>(
        query: T extends Query<DB, infer TTable> ? T : never,
    ): CompiledQuery {
        const { kQuery } = composeQuery({
            defaultSchema: this.schema,
            db: this.db,
            query,
        });
        return kQuery.compile();
    }

    async explain<TTable extends Table<DB>>(
        query: Query<DB, TTable>,
    ): Promise<QueryPlan> {
        const { sql, parameters } = composeQuery({
            defaultSchema: this.schema,
            db: this.db,
            query,
        }).kQuery.compile();
        const explainQuery: string = `explain (analyze, buffers, verbose, settings, format json) ${sql}`;

        const result = await this.pool.query(
            explainQuery,
            parameters as string[],
        );
        return result.rows[0]['QUERY PLAN'][0];
    }

    private async tryToExecute(query: SelectQueryBuilder<any, any, any>) {
        const { sql } = query.compile();
        try {
            return await query.execute();
        } catch (error) {
            throw new SqlError(sql, error);
        }
    }
}

class SqlError extends Error {
    constructor(
        public sql: string,
        err: Error | any,
    ) {
        super(err?.message);
    }
}
