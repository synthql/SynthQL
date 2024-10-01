import { ExecResultNode, ExecResultTree } from '../types';

export function shouldYield(tree: ExecResultTree): boolean {
    return shouldYieldNode(tree.root);
}

function shouldYieldNode(node: ExecResultNode): boolean {
    const plannedChildren = node.planNode.children;
    const executedChildren = node.children;

    const allChildrenExecuted =
        plannedChildren.length === executedChildren.length;

    if (allChildrenExecuted) {
        return true;
    }

    for (const child of executedChildren) {
        if (!shouldYieldNode(child)) {
            return false;
        }
    }

    return false;
}
