import { ExecResultNode, ExecResultTree } from '../types';

/**
 * Looks at the execution tree and determines if we should yield results to the client.
 *
 * The current implementation should only yield once - when all planning nodes have been
 * executed.
 */
export function shouldYield(tree: ExecResultTree): boolean {
    return shouldYieldNode(tree.root);
}

/**
 * Recursively checks if we should yield for a given node.
 *
 * As a reminder, an `ExecResultNode` is by definition, the execution of the planned node
 * (i.e. the node that was initially planned).
 *
 * An ExecResultNode might have planned children, but no executed children. This indicates that
 * execution has not finished for the children.
 */
function shouldYieldNode(node: ExecResultNode): boolean {
    const plannedChildren = node.planNode.children;
    const executedChildren = node.children;

    // If the number of executed children is less than the number of planned children,
    // we should not yield yet
    if (executedChildren.length < plannedChildren.length) {
        return false;
    }

    // Recursively check all executed children
    for (const child of executedChildren) {
        if (!shouldYieldNode(child)) {
            return false;
        }
    }

    // If we've reached this point, all children (and their descendants) are fully executed
    return true;
}
