import { AnyQuery } from "../types";
import { assertPresent } from "../util/asserts/assertPresent";
import { iterateQuery } from "./iterateQuery";

export function splitQueryAtBoundary(q: AnyQuery, shouldSplit: (q: AnyQuery) => boolean): { query: AnyQuery, remaining: AnyQuery[] } {
    const clone = structuredClone(q);
    const remaining: AnyQuery[] = [];
    for (const { query, parentQuery, includeKey } of iterateQuery(clone)) {
        const isRoot = parentQuery === undefined || includeKey === undefined;

        if (isRoot || !shouldSplit(query)) {
            // never split the root
            continue;
        }

        assertPresent(parentQuery.include)
        delete parentQuery.include[includeKey];
        remaining.push(query);
    }
    return { query: clone, remaining }
}