export function splitTreeAtBoundary<
    T extends {
        children: T[];
    },
>(
    tree: T,
    shouldSplit: (node: T) => boolean,
    mutateLeaf: (leaf: T, childToRemove: T) => void = () => {},
): {
    tree: T;
    remaining: T[];
} {
    const clone = structuredClone(tree);
    const remaining: T[] = [];

    const queue: { node: T; index: number; parent: T }[] = clone.children.map(
        (node, index) => ({ node, index, parent: clone }),
    );

    while (queue.length > 0) {
        const { node: head, index, parent } = queue.pop()!;

        if (shouldSplit(head)) {
            remaining.push(head);
            parent.children.splice(index, 1);
            mutateLeaf(parent, head);
        } else {
            queue.push(
                ...head.children.map((node, index) => ({
                    node,
                    index,
                    parent,
                })),
            );
        }
    }
    return {
        tree: clone,
        remaining,
    };
}
