import { Path } from "../../execution/types";
import { assertArrayAtPath } from "../asserts/assertArrayAtPath";
import { assertObject } from "../asserts/assertObject";
import { isAnyIndex } from "../path/isAnyIndex";

export function getIn(tree: unknown, path: Path): unknown[] {
    if (path.length === 0) {
        return [tree];
    }

    const result: Array<unknown> = [];

    const queue: Array<{
        parent: unknown,
        sliceIndex: number,
        resolvedPathSegment: string | number
    }> = resolvePathSegment(path.slice(0, 1), tree).map(pathSegment => {
        return {
            parent: tree,
            sliceIndex: 1,
            resolvedPathSegment: pathSegment
        }
    })

    while (queue.length > 0) {
        const head = queue.shift()!;
        const { parent, sliceIndex, resolvedPathSegment } = head;
        const child = getInPathSegment(parent, path.slice(0, sliceIndex), resolvedPathSegment)


        const isLastIndex = sliceIndex === path.length;

        if (child === undefined) {
            continue;
        }
        if (isLastIndex) {
            result.push(child);
        }
        else {
            const nextSliceIndex = sliceIndex + 1;
            const nextSlice = path.slice(0, nextSliceIndex);
            resolvePathSegment(nextSlice, child).map(nextPathSegment => {
                return {
                    parent: child,
                    sliceIndex: nextSliceIndex,
                    resolvedPathSegment: nextPathSegment
                }
            }).forEach(next => queue.push(next));
        }
    }

    return result
}

function resolvePathSegment(path: Path, tree: unknown): Array<string | number> {
    const segment = path[path.length - 1];
    if (typeof segment === 'number') {
        return [segment];
    }
    if (typeof segment === 'string') {
        return [segment];
    }
    if (isAnyIndex(segment)) {
        assertArrayAtPath(tree, path);
        return tree.map((_, i) => i);
    } /* v8 ignore next 2 */
    throw new Error(`Unknown path segment: ${segment} at path ${path}`)
}

function getInPathSegment<T>(tree: T, path: Path, pathSegment: string | number): unknown | undefined {
    if (path.length === 0) {
        return tree;
    }

    if (tree === undefined) {
        return undefined;
    }

    if (typeof pathSegment === 'number') {
        assertArrayAtPath(tree, path);
        return tree[pathSegment];
    }
    if (typeof pathSegment === 'string') {
        assertObject(tree, path);
        return tree[pathSegment];
    } /* v8 ignore next 2 */
    throw new Error(`Unknown path segment: ${pathSegment} at path ${path}`)
}