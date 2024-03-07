import { AnyQuery } from "../types";
import { iterateQuery } from "./iterateQuery";

/**
 * Recursively maps a query and its children using the provided mapper function. 
 */
export function collectFromQuery<T>(query: AnyQuery, collect: (query: AnyQuery) => T[]): T[] {
    const collection: T[] = []

    for (const { query: subQuery } of iterateQuery(query)) {
        collection.push(...collect(subQuery))
    }
    return collection
}