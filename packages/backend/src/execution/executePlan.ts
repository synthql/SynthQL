import { mapTree } from "../util/mapTree";
import { ExecPlanTree, ExecResultTree, ExecutionPlanNode, ExecResultNode as ExecutionResultNode } from "./types";

export function executePlan(planTree: ExecPlanTree): AsyncGenerator<ExecResultTree> {
    const executionContext = { refContext: planTree.refContext }
    return mapTree<ExecutionPlanNode, ExecutionResultNode>(planTree, async (planNode, parentNode) => {
        const result = await planNode.executor.execute(planNode.query, executionContext);
        return {
            query: planNode.query,
            result,
            children: []
        }
    })
}

