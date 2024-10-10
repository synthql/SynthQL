interface Visitor<T> {
    node: T;
    parent?: T;
    path: string[];
}

type GetChildren<T> = (visitor: Visitor<T>) => Visitor<T>[];

export function getObjectChildren<T>({ node, path }: Visitor<T>): Visitor<T>[] {
    if (node === null || typeof node !== 'object' || node instanceof Date) {
        return [];
    }

    return Object.entries(node).map(([key, value]) => ({ node: value, parent: node, path: [...path, key] }));
}

/**
 * Iterates over a tree structure.
 *
 * @param tree - The root of the tree.
 * @returns A generator that yields each node in the tree, with its path.
 */
export function* iterateTree<T>(
    tree: T,
    getChildren: GetChildren<T>,
): Generator<Visitor<T>> {
    const stack: Visitor<T>[] = [{ node: tree, path: [], parent: undefined }];

    while (stack.length > 0) {
        const visitor = stack.pop()!;

        yield visitor;

        for (const child of getChildren(visitor)) {
            stack.push(child);
        }
    }
}
