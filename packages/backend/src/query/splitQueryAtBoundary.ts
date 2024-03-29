import { AnyQuery } from '../types';
import { assertPresent } from '../util/asserts/assertPresent';
import { iterateQuery } from './iterateQuery';

export function splitQueryAtBoundary<TQuery extends AnyQuery>(
    q: TQuery,
    shouldSplit: (q: TQuery, opts: { depth: number }) => boolean,
): { query: TQuery; remaining: TQuery[] } {
    const clone = structuredClone(q);
    const remaining: TQuery[] = [];

    const partOfSplitSubtree = new Set<TQuery | undefined>();
    for (const { query, parentQuery, includeKey, depth } of iterateQuery(
        clone,
    )) {
        const isRoot = parentQuery === undefined || includeKey === undefined;

        if (partOfSplitSubtree.has(parentQuery)) {
            // don't split if the parent query is already part of the split
            partOfSplitSubtree.add(query);
            continue;
        }
        if (isRoot || !shouldSplit(query, { depth })) {
            // never split the root
            continue;
        }

        assertPresent(parentQuery.include);
        delete parentQuery.include[includeKey];
        remaining.push(query);
        partOfSplitSubtree.add(query);
    }
    return { query: clone, remaining };
}
