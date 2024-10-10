import { AnyQuery } from '@synthql/queries';

/**
 * Calculate the height of a query i.e. the maximum depth of the query tree.
 */
export function queryHeight(query: AnyQuery): number {
    const subQueries = Object.values(query.include ?? {});

    if (subQueries.length === 0) {
        return 1;
    }

    return 1 + Math.max(...subQueries.map((subQuery) => queryHeight(subQuery)));
}
