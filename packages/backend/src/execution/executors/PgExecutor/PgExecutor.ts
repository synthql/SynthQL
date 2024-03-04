import { Pool, PoolClient } from "pg";
import { AnyQuery } from "../../../types";
import { QueryExecutor } from "../../types";
import { QueryProviderExecutor } from "../QueryProviderExecutor";
import { composeQuery } from "./composeQuery";
import { hydrate } from "./hydrate";
import { RefContext, createRefContext } from "../../references/resolveReferences";
import { format } from "sql-formatter";
import { SqlExecutionError } from "../SqlExecutionError";
import { ColumnRef } from "./queryBuilder/refs";

type PgQueryResult = {
    [key: string]: any;
}

export class PgExecutor implements QueryExecutor<PgQueryResult> {

    private client: Promise<PoolClient>;

    constructor(pool: Pool, private defaultSchema: string, private qpe: QueryProviderExecutor) {
        this.client = pool.connect();
    }

    compile(query: AnyQuery) {
        const { sqlBuilder } = composeQuery({ query, defaultSchema: this.defaultSchema });
        const { sql, params } = sqlBuilder.build()
        return {
            sql: format(sql, { language: 'postgresql' }),
            params
        }
    }

    async execute(query: AnyQuery): Promise<Array<PgQueryResult>> {
        const client = await this.client;
        const { sqlBuilder, augmentedQuery } = composeQuery({
            defaultSchema: this.defaultSchema,
            query
        });
        const { params, sql } = sqlBuilder.build();

        try {
            const queryResult = await client.query(sql, params);
            const rows = queryResult.rows

            return hydrate(rows, augmentedQuery) as Array<PgQueryResult>;
        } catch (err) {
            throw new SqlExecutionError({
                err,
                sql,
                params,
                query
            })
        }
    }

    canExecute(query: AnyQuery): { query: AnyQuery, remaining: AnyQuery[] } | undefined {
        if (this.qpe.canExecute(query)) {
            return undefined
        }
        const isSupported = (q: AnyQuery) => {
            const isProviderQuery = this.qpe.canExecute(q);
            const isLazyQuery = q.lazy;
            return !isProviderQuery && !isLazyQuery;
        }
        return collectSupportedQueries(query, isSupported);
    }

    collectRefValues(row: any, columns: ColumnRef[]): RefContext {
        const refContext = createRefContext()
        for (const column of columns) {
            const value = row[column.column]
            refContext.addValues(column, value)
        }

        return refContext;
    }
}



function collectSupportedQueries(query: AnyQuery, isSupported: (q: AnyQuery) => boolean): { query: AnyQuery, remaining: AnyQuery[] } {

    const remaining: AnyQuery[] = []

    const include: AnyQuery['include'] = {}
    for (const [key, subQuery] of Object.entries(query.include ?? {})) {
        if (isSupported(subQuery)) {
            include[key] = collectSupportedQueries(subQuery, isSupported).query
        }
        else {
            remaining.push(subQuery)
        }
    }

    return {
        query: {
            ...query,
            include
        }, remaining
    }
}

