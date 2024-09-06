import { AnyQuery } from '@synthql/queries';
import { Path } from '../execution/types';
import { iterateQuery } from './iterateQuery';

/**
 * Recursively maps a query and its children using the provided mapper function.
 */
export function collectFromQuery<T>(
    query: AnyQuery,
    collect: (query: AnyQuery, opts: { insertionPath: Path }) => T[],
): T[] {
    const collection: T[] = [];

    for (const { query: subQuery, insertionPath } of iterateQuery(query)) {
        collection.push(...collect(subQuery, { insertionPath }));
    }
    return collection;
}
