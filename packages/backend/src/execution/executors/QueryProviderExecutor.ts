import { QueryProvider } from "../../QueryProvider";
import { AnyQuery } from "../../types";
import { ExecResultTree, QueryExecutor } from "../types"

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

    canExecute(query: AnyQuery): { query: AnyQuery, remaining: AnyQuery[] } | undefined {
        const isSupported = this.providersByTable.has(query.from);

        if (!isSupported) {
            return undefined;
        }

        const queryWithoutChildren: AnyQuery = {
            ...query,
            include: undefined
        }

        return { query: queryWithoutChildren, remaining: [] };
    }
}