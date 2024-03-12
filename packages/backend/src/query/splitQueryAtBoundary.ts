import { AnyQuery } from '../types';
import { assertPresent } from '../util/asserts/assertPresent';
import { iterateQuery } from './iterateQuery';

export function splitQueryAtBoundary<TQuery extends AnyQuery>(
    q: TQuery,
    shouldSplit: (q: TQuery, opts: { depth: number }) => boolean,
): { query: TQuery; remaining: TQuery[] } {
    const clone = structuredClone(q);
    const remaining: TQuery[] = [];
    for (const { query, parentQuery, includeKey, depth } of iterateQuery(
        clone,
    )) {
        const isRoot = parentQuery === undefined || includeKey === undefined;

        if (isRoot || !shouldSplit(query, { depth })) {
            // never split the root
            continue;
        }

        assertPresent(parentQuery.include);
        delete parentQuery.include[includeKey];
        remaining.push(query);
    }
    return { query: clone, remaining };
}
