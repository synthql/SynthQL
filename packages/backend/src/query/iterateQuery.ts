import { Path } from "../execution/types";
import { AnyQuery } from "../types";
import { setIn } from "../util/tree/setIn"
import { getIn } from "../util/tree/getIn"

interface QueryIterItem<TQuery extends AnyQuery> {
    /**
     * The query being iterated over
     */
    query: TQuery;

    /**
     * The parent query of the current query
     */
    parentQuery?: TQuery;

    includeKey?: string;
    /**
     * The insertion path.
     * 
     * An insertion path can be used by functions such as {@link setIn} or {@link getIn} to set or get a value from the QueryResult.
     * 
     * Example:
     * 
     * ```
     * [anyIndex, 'actors', anyIndex, 'lang', anyIndex]
     * ```
     */
    insertionPath: Path;
}

/**
 * Iterate over a query and its subqueries
 * 
 * 
 */
export function* iterateQuery<TQuery extends AnyQuery>(query: TQuery): Generator<QueryIterItem<TQuery>> {
    const stack: QueryIterItem<TQuery>[] = [{ query, insertionPath: [{ type: 'anyIndex' }] }];

    while (stack.length > 0) {
        const { query, insertionPath, includeKey, parentQuery } = stack.pop()!;

        yield { query, insertionPath, includeKey, parentQuery };

        for (const [includeKey, subQuery] of Object.entries(query.include ?? {})) {
            stack.push({
                query: subQuery as TQuery,
                insertionPath: [...insertionPath, includeKey, { type: 'anyIndex' }],
                parentQuery: query,
                includeKey
            });
        }
    }
}