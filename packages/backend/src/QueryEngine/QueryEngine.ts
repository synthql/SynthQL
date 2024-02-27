import {
    CompiledQuery,
    Kysely,
    PostgresDialect,
    SelectQueryBuilder,
} from 'kysely';
import { Pool } from 'pg';
import { Query, QueryResult, Table } from "@synthql/queries";
import { composeQuery } from '../execution/executors/KyselyExecutor/composeQuery';
import { hydrate } from '../execution/executors/KyselyExecutor/hydrate';
import { QueryPlan } from '..';
import { introspectSchema } from '../introspection/introspectSchema';
import { QueryProvider } from '../QueryProvider';
import { GenerateSchemaConfig, generateSchema } from '../introspection/generateSchema';
import { execute } from '../execution/execute';
import { QueryExecutor } from '../execution/types';
import { QueryProviderExecutor } from '../execution/executors/QueryProviderExecutor';
import { KyselyExecutor } from '../execution/executors/KyselyExecutor';

export interface QueryEngineProps<DB> {
    url?: string;
    schema?: string;
    providers?: Array<QueryProvider>;
    pool?: Pool;
}

export class QueryEngine<DB> {
    private dialect: PostgresDialect;
    private db: Kysely<DB>;
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
        this.dialect = new PostgresDialect({
            pool: this.pool,
        });
        this.db = new Kysely({ dialect: this.dialect });

        const qpe = new QueryProviderExecutor(config.providers ?? []);
        this.executors = [qpe, new KyselyExecutor(this.pool, this.schema, qpe)]
    }

    execute<TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(
        query: TQuery,
        opts?: { schema?: string },
    ): AsyncGenerator<QueryResult<DB, TQuery>> {

        return execute<DB, TQuery>(query, {
            executors: this.executors,
        })
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

    async introspect(config?: { schemas?: string[] }) {
        const schemas = config?.schemas ?? ['public', this.schema];
        return introspectSchema(this as any, { schemas });
    }

    async generateSchema(config: GenerateSchemaConfig) {
        return generateSchema(this as any, config);
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
