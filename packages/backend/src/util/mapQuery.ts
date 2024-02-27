import { AnyQuery } from "../types";

/**
 * Recursively maps a query and its children using the provided mapper function. 
 */
export function mapQuery(query: AnyQuery, mapper: (query: AnyQuery) => AnyQuery): AnyQuery {
    const mappedQuery = mapper(query);

    const { include = {} } = mappedQuery;
    for (const key in include) {
        const value = include[key];
        include[key] = mapQuery(value, mapper);
    }
    return mappedQuery;
}