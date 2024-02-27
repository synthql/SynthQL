interface Node {
    children: Node[];
}

interface Tree<TNode extends Node> {
    root: TNode;
}

export async function* mapTree<TInputNode extends Node, TOutputNode extends Node>(
    inputTree: Tree<TInputNode>,
    mapper: (inputNode: TInputNode, parentNode: TOutputNode | undefined) => Promise<TOutputNode>
): AsyncGenerator<Tree<TOutputNode>> {
    async function mapWithoutChildren(node: TInputNode, parentNode: TOutputNode | undefined): Promise<TOutputNode> {
        const result = await mapper(node, parentNode);
        result.children = [];
        return result;
    }

    // Initialize the queue with the root node and its mapped version.
    const queue: Array<{ originalNode: TInputNode; mappedNode: TOutputNode; parentNode?: TOutputNode }> = [];
    const mappedRoot = await mapWithoutChildren(inputTree.root, undefined);
    const outputTree: Tree<TOutputNode> = { root: mappedRoot };

    yield outputTree;

    queue.push({ originalNode: inputTree.root, mappedNode: mappedRoot });

    while (queue.length > 0) {

        const { originalNode, mappedNode, parentNode } = queue.shift()!;

        // Process all children of the current node in parallel.
        const mappedChildren = await Promise.all(
            originalNode.children.map((child) => {
                return mapWithoutChildren(child as TInputNode, parentNode)
            })
        );

        // After mapping, update the children of the current mapped node.
        mappedNode.children = mappedChildren;

        // Enqueue the children for their own processing, along with their mapped versions.
        originalNode.children.forEach((child, index) => {
            queue.push({
                originalNode: child as TInputNode,
                mappedNode: mappedChildren[index],
                parentNode: mappedNode
            });
        });

        // Yield the tree after each node is processed.
        yield outputTree;
    }

    // The function implicitly returns when the generator completes.
}

