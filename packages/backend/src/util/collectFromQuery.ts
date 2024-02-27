import { AnyQuery } from "../types";

/**
 * Recursively maps a query and its children using the provided mapper function. 
 */
export function collectFromQuery<T>(query: AnyQuery, collect: (query: AnyQuery) => T[]): T[] {
    const collection: T[] = []
    const queue: AnyQuery[] = [query]

    while (queue.length > 0) {
        const current = queue.pop()!;
        collection.push(...collect(current))
        queue.push(...Object.values(current.include ?? {}));
    }
    return collection;
}