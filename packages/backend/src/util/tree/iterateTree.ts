export function* iterateTree<T extends { children: T[] }>(
    tree: T,
): Generator<T> {
    const stack: T[] = [tree];

    while (stack.length > 0) {
        const node = stack.pop()!;

        yield node;

        for (const child of node.children) {
            stack.push(child);
        }
    }
}
