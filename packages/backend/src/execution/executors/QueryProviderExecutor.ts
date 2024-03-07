
import { QueryProvider } from "../../QueryProvider";
import { AnyQuery } from "../../types";
import { QueryNode } from "../../util/createQueryTree";
import { RefContext, createRefContext } from "../references/resolveReferences";
import { QueryExecutor } from "../types";
import { ColumnRef } from "./PgExecutor/queryBuilder/refs";

export class QueryProviderExecutor implements QueryExecutor {
    private providersByTable: Map<string, QueryProvider>;
    constructor(providers: QueryProvider[]) {
        this.providersByTable = new Map(providers.map(p => [p.table, p]));
    }

    execute(query: AnyQuery): Promise<Array<any>> {
        const provider = this.providersByTable.get(query.from);
        if (!provider) {
            throw new Error(`No provider for table ${query.from}`);
        }
        return provider.execute(query);
    }

    canExecute(query: QueryNode) {
        const isSupported = this.providersByTable.has(query.query.from);

        if (!isSupported) {
            return undefined;
        }

        const queryWithoutChildren: QueryNode = {
            ...query,
            children: []
        }

        return { query: queryWithoutChildren, remaining: query.children };
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