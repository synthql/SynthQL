import { Path } from '../../execution/types';
import { assertArrayAtPath } from '../asserts/assertArrayAtPath';
import { assertObject } from '../asserts/assertObject';

export function getIn(tree: unknown, path: Path): unknown[] {
    if (path.length === 0) {
        return Array.isArray(tree) ? tree : [tree]
    }

    const queue: Array<{ parent: unknown, pathIndex: number }> = [{ parent: tree, pathIndex: -1 }];
    const result: unknown[] = [];

    while (queue.length > 0) {
        const { parent, pathIndex } = queue.shift()!;
        const nextPathIndex = pathIndex + 1;

        if (nextPathIndex === path.length) {
            result.push(...(Array.isArray(parent) ? parent : [parent]));
            continue;
        }

        const valuesAtPath = getNext(parent, path.slice(0, nextPathIndex + 1), path[nextPathIndex]);

        queue.push(...valuesAtPath.map((nestedValue) => {
            return ({
                parent: nestedValue,
                pathIndex: nextPathIndex
            });
        }).filter(({ parent }) => parent !== undefined));
    }
    return result
}

function getNext(
    tree: unknown,
    path: Path,
    pathSegment: Path[number],
): unknown[] {
    if (path.length === 0) {
        return [tree];
    }
    if (tree === undefined) {
        return []
    }
    if (Array.isArray(tree)) {
        return tree.flatMap((item) => getNext(item, path, pathSegment))
    }
    if (typeof pathSegment === 'number') {
        assertArrayAtPath(tree, path);
        return [tree[pathSegment]];
    }
    if (typeof pathSegment === 'string') {
        assertObject(tree, path);
        return [tree[pathSegment]];
    } /* v8 ignore next 2 */
    throw new Error(`Unknown path segment: ${pathSegment} at path ${path}`);
}
