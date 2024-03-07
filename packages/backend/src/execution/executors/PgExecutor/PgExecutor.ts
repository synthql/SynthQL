import { Pool, PoolClient } from "pg";
import { format } from "sql-formatter";
import { AnyQuery } from "../../../types";
import { QueryNode } from "../../../util/createQueryTree";
import { RefContext, createRefContext } from "../../references/resolveReferences";
import { QueryExecutor } from "../../types";
import { QueryProviderExecutor } from "../QueryProviderExecutor";
import { SqlExecutionError } from "../SqlExecutionError";
import { composeQuery } from "./composeQuery";
import { hydrate } from "./hydrate";
import { ColumnRef } from "./queryBuilder/refs";
import { splitTreeAtBoundary } from "../../../util/splitTreeAtBoundary";
import { assertPresent } from "../../../util/assertPresent";

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

    canExecute(query: QueryNode): { query: QueryNode, remaining: QueryNode[] } | undefined {
        if (this.qpe.canExecute(query)) {
            return undefined
        }
        const isSupported = (q: QueryNode) => {
            const isProviderQuery = this.qpe.canExecute(q);
            const isLazyQuery = q.query.lazy;
            return !isProviderQuery && !isLazyQuery;
        }

        const { tree, remaining } = splitTreeAtBoundary(query, isSupported, (parent, child) => {
            assertPresent(child.includeKey);
            assertPresent(parent.query.include);
            const includeKey = child.includeKey
            delete parent.query.include[includeKey]
        })
        return { query: tree, remaining }
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





