import { AnyQuery, AnyTable, Query, QueryPlan, QueryResult, Table } from "../types";
import { PostgresDialect, Kysely, SelectExpression, sql, SelectQueryBuilder, CompiledQuery } from "kysely"
import { Pool } from "pg";
import { format } from "sql-formatter"
import { isQuery } from "../Query/isQuery";
import { composeQuery } from "./composeQuery";
import { hydrate } from "./hydrate";

export class QueryEngine<DB> {
    private dialect: PostgresDialect;
    private db: Kysely<DB>;
    private pool: Pool;
    private schema: string;
    constructor(config: {
        url: string,
        schema?: string
    }) {
        this.schema = config.schema ?? 'public'
        this.pool = new Pool({
            connectionString: config.url,
            max: 10,

        });
        this.dialect = new PostgresDialect({
            pool: this.pool,

        });
        this.db = new Kysely({ dialect: this.dialect });
    }

    async * execute<TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(query: TQuery): AsyncGenerator<QueryResult<DB, TQuery>> {
        const { kQuery, rootQuery } = composeQuery({
            defaultSchema: this.schema,
            db: this.db,
            query
        });

        const databaseResults = await kQuery.execute();

        yield hydrate(databaseResults, rootQuery) as QueryResult<DB, TQuery>;
    }



    compile<T>(query: T extends Query<DB, infer TTable> ? T : never): CompiledQuery {
        const { kQuery } = composeQuery({ defaultSchema: this.schema, db: this.db, query });
        return kQuery.compile()
    }

    async explain<TTable extends Table<DB>>(query: Query<DB, TTable>): Promise<QueryPlan> {
        const { sql, parameters } = composeQuery({ defaultSchema: this.schema, db: this.db, query }).kQuery.compile();
        const explainQuery: string = `explain (analyze, buffers, verbose, settings, format json) ${sql}`;

        const result = await this.pool.query(explainQuery, parameters as string[])
        return result.rows[0]['QUERY PLAN'][0]
    }
}

function splitQueries<DB, TQuery extends Query<DB, any>>(query: TQuery): TQuery[] {
    // For now we don't actually split the queries.
    // This means we support a max of one lazy boundary.
    console.log('splitting queries');
    return [query];
}




