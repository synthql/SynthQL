import { AnyQuery } from "../../types";
import { QueryExecutor } from "../types";

/**
 * Used for testing purposes. This executor does nothing, it just returns the query as is.
 */
export class IdentityExecutor implements QueryExecutor<AnyQuery> {
    constructor(private depth: number) { }

    canExecute(query: AnyQuery): { query: AnyQuery; remaining: AnyQuery[]; } | undefined {
        return collectSupportedQueries(query, this.depth);
    }

    async execute(query: AnyQuery): Promise<AnyQuery[]> {
        return [query];
    }
}

function collectSupportedQueries(query: AnyQuery, depth: number): { query: AnyQuery, remaining: AnyQuery[] } {

    const remaining: AnyQuery[] = []

    const include: AnyQuery['include'] = {}
    for (const [key, subQuery] of Object.entries(query.include ?? {})) {
        if (depth > 0) {
            include[key] = collectSupportedQueries(subQuery, depth - 1).query
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