import {
    CompiledQuery,
    Kysely,
    PostgresDialect,
    SelectQueryBuilder,
} from 'kysely';
import { Pool } from 'pg';
import { Query, QueryResult, Table } from "@synthql/queries";
import { composeQuery } from '../execution/executors/PgExecutor/composeQuery';
import { hydrate } from '../execution/executors/PgExecutor/hydrate';
import { QueryPlan } from '..';
import { introspectSchema } from '../introspection/introspectSchema';
import { QueryProvider } from '../QueryProvider';
import { GenerateSchemaConfig, generateSchema } from '../introspection/generateSchema';
import { execute } from '../execution/execute';
import { QueryExecutor } from '../execution/types';
import { QueryProviderExecutor } from '../execution/executors/QueryProviderExecutor';
import { PgExecutor } from '../execution/executors/PgExecutor';
import { SqlExecutionError } from '../execution/executors/SqlExecutionError';

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
        this.executors = [qpe, new PgExecutor(this.pool, this.schema, qpe)]
    }

    execute<TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(
        query: TQuery,
        opts?: { schema?: string },
    ): AsyncGenerator<QueryResult<DB, TQuery>> {

        return execute<DB, TQuery>(query, {
            executors: this.executors,
            defaultSchema: opts?.schema ?? this.schema,
        })
    }

    compile<T>(
        query: T extends Query<DB, infer TTable> ? T : never,
    ): { sql: string, params: any[] } {
        const { sqlBuilder } = composeQuery({
            defaultSchema: this.schema,
            query,
        });

        return sqlBuilder.build()
    }

    async explain<TTable extends Table<DB>>(
        query: Query<DB, TTable>,
    ): Promise<QueryPlan> {
        const { sqlBuilder } = composeQuery({
            defaultSchema: this.schema,
            query,
        });

        const { params, sql } = sqlBuilder.build()

        const explainQuery: string = `explain (analyze, buffers, verbose, settings, format json) ${sql}`;

        try {
            const result = await this.pool.query(
                explainQuery,
                params
            );
            return result.rows[0]['QUERY PLAN'][0];
        } catch (err) {
            throw new SqlExecutionError({
                err,
                params,
                sql,
                query
            })
        }
    }

    async introspect(config?: { schemas?: string[] }) {
        const schemas = config?.schemas ?? ['public', this.schema];
        return introspectSchema(this as any, { schemas });
    }

    async generateSchema(config: GenerateSchemaConfig) {
        return generateSchema(this as any, config);
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
