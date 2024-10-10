import { DeferredResult } from '@synthql/queries';
import { mapRecursive } from '../../util/tree/mapRecursive';

/**
 * Function used for testing to flatten deferred results in a query object.
 *
 * Example:
 *
 * ```ts
 * {user_id: string, friends: DeferredResult<{user_id: string, name: string}[]>}
 * ```
 *
 * Becomes:
 *
 * ```ts
 * {user_id: string, friends: {user_id: string, name: string}[]}
 * ```
 */
export function flattenDeferredQueryResult(queryWithDeferResult: {
    [key: string]: any;
}) {
    return mapRecursive(queryWithDeferResult, (node) => {
        if (isDeferredResult(node)) {
            return node.data;
        }
        return node;
    });
}

type DoneDeferredResult<T = unknown> = DeferredResult<T> & { status: 'done' };

// note that this cannot be made a general purpose function because it can very easily produce
// false positives. This is only intended to be used in tests.
// Maybe in the future we will force DeferredResult
function isDeferredResult<T = unknown>(x: any): x is DoneDeferredResult<T> {
    return (
        x !== null &&
        x !== undefined &&
        x.status === 'done' &&
        x.data !== undefined
    );
}
