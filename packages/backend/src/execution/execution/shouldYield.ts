import { ExecResultNode, ExecResultTree } from '../types';

export function shouldYield(tree: ExecResultTree): boolean {
    return shouldYieldNode(tree.root);
}

function shouldYieldNode(node: ExecResultNode): boolean {
    const plannedChildren = node.planNode.children;
    const executedChildren = node.children;

    const allPlannedChildrenAreLazyQueries =
        plannedChildren.length > 0 &&
        plannedChildren.every((node) => node.inputQuery.lazy === true);

    if (allPlannedChildrenAreLazyQueries) {
        return true;
    }

    const someExecutedChildrenAreNotLazyQueries =
        plannedChildren.length > 0 &&
        executedChildren.some((node) => node.inputQuery.lazy !== true);

    if (someExecutedChildrenAreNotLazyQueries) {
        return true;
    }

    const allPlannedChildrenHaveBeenExecuted =
        plannedChildren.length === executedChildren.length;

    if (allPlannedChildrenHaveBeenExecuted) {
        return true;
    }

    for (const child of executedChildren) {
        if (!shouldYieldNode(child)) {
            return false;
        }
    }

    return false;
}
