export interface Node {
    children: Node[];
}

interface Tree<TNode extends Node> {
    root: TNode;
}

export async function* mapTree<
    TInputNode extends Node,
    TOutputNode extends Node,
>(
    inputTree: Tree<TInputNode>,
    mapper: (
        inputNode: TInputNode,
        parentNode: TOutputNode | undefined,
    ) => Promise<TOutputNode>,
): AsyncGenerator<Tree<TOutputNode>> {
    async function mapWithoutChildren(
        node: TInputNode,
        parentNode: TOutputNode | undefined,
    ): Promise<TOutputNode> {
        const result = await mapper(node, parentNode);

        // We need to clear the children because `yield` the tree from time to time,
        // and we don't want to yield the tree with children that are not processed yet.
        result.children = [];
        return result;
    }

    // Initialize an empty queue.
    const queue: Array<{
        originalNode: TInputNode;
        mappedNode: TOutputNode;
    }> = [];
    const mappedRoot = await mapWithoutChildren(inputTree.root, undefined);
    const outputTree: Tree<TOutputNode> = { root: mappedRoot };

    // Yield the tree after the root node is processed.
    yield outputTree;

    // Enqueue the root node for processing.
    // No parent node at the root level.
    queue.push({ originalNode: inputTree.root, mappedNode: mappedRoot });

    while (queue.length > 0) {
        const { originalNode, mappedNode } = queue.shift()!;

        // Process all children concurrently.
        const newChildren = await Promise.all(
            originalNode.children.map(async (child) => {
                const originalNode = child as TInputNode;
                return {
                    originalNode,
                    mappedNode: await mapWithoutChildren(
                        originalNode,
                        mappedNode,
                    ),
                };
            }),
        );

        // After mapping, update the children of the current mapped node.
        mappedNode.children = newChildren.map((child) => child.mappedNode);

        // Yield the tree after each node is processed.
        yield outputTree;

        // Enqueue all children for processing.
        queue.push(...newChildren);
    }

    // The function implicitly returns when the generator completes.
}
