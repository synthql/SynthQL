import { mapTree } from "./mapTree";
import { ExecPlanTree, ExecResultNode as ExecutionResultNode, ExecResultTree as ExecResultTree, ExecutionPlanNode } from "./types";

export function executePlan(planTree: ExecPlanTree): AsyncGenerator<ExecResultTree> {
    return mapTree<ExecutionPlanNode, ExecutionResultNode>(planTree, async (planNode) => {
        console.log('Executing planNode', planNode.query.from)
        const result = await planNode.executor.execute(planNode.query);
        return {
            query: planNode.query,
            result,
            children: []
        }
    })
}

