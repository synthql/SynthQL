import { Pool, PoolClient } from "pg";
import { format } from "sql-formatter";
import { splitQueryAtBoundary } from "../../../query/splitQueryAtBoundary";
import { ColumnRef } from "../../../refs/ColumnRef";
import { RefContext, createRefContext } from "../../../refs/RefContext";
import { AnyQuery } from "../../../types";
import { QueryExecutor } from "../../types";
import { QueryProviderExecutor } from "../QueryProviderExecutor";
import { SqlExecutionError } from "../SqlExecutionError";
import { composeQuery } from "./composeQuery";
import { hydrate } from "./hydrate";

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
            console.log(format(sql, { language: 'postgresql' }))

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

    canExecute<TQuery extends AnyQuery>(query: TQuery): { query: TQuery, remaining: TQuery[] } | undefined {
        if (this.qpe.canExecute(query)) {
            return undefined
        }
        const shouldSplit = (q: TQuery, { depth }: { depth: number }): boolean => {
            const isProviderQuery = Boolean(this.qpe.canExecute(q));
            const isLazyQuery = Boolean(q.lazy);
            if (depth >= 2) {
                return true
            }
            return isProviderQuery || isLazyQuery;
        }

        return splitQueryAtBoundary(query, shouldSplit)
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





