import { Path } from '../../execution/types';
import { assertArrayAtPath } from '../asserts/assertArrayAtPath';
import { assertObject } from '../asserts/assertObject';
import { getIn } from './getIn';

/**
 * Set the `value` object at the path given by `path` with the result of `updater`.
 *
 * Example:
 *
 * ```ts
 * const value = {
 *    a: {
 *       b: [{}, {}, {}]
 *   }
 * }
 *
 * const updated = setIn(value, ['a', 'b', { type: 'anyIndex' },'c'], () => 'thing')
 *
 * // { a: { b: [ { c: 'thing' }, { c: 'thing' }, { c: 'thing' } ] } }
 * ```
 */
export function setIn<TTree>(
    tree: TTree,
    path: Path,
    getValue: (parent: unknown) => unknown,
): TTree {
    const slice = path.slice(0, path.length - 1);
    const parents = getIn(tree, slice);

    for (const parent of parents) {
        const child = getValue(parent);
        const lastSegment = path[path.length - 1];

        if (Array.isArray(parent)) {
            for (const parentItem of parent) {
                setOnObject(parentItem, slice, lastSegment, child);
            }
        }
        else {
            setOnObject(parent, slice, lastSegment, child)
        }
    }

    return tree;
}

function setOnObject(parent: unknown, pathToParent: Path, lastSegment: Path[number], child: unknown) {
    if (typeof lastSegment === 'number') {
        assertArrayAtPath(parent, pathToParent);
        parent[lastSegment] = child;
    } else if (typeof lastSegment === 'string') {
        assertObject(parent, pathToParent);
        parent[lastSegment] = child;
    } /* v8 ignore next 3 */ else {
        throw new Error(
            `Unknown path segment: ${JSON.stringify(lastSegment)}`,
        );
    }
}
