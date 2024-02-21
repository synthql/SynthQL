import { mapTree } from "./mapTree";
import { ExecPlanTree, ExecResultNode as ExecutionResultNode, ExecResultTree as ExecResultTree, ExecutionPlanNode } from "./types";

export function executePlan(plan: ExecPlanTree): AsyncGenerator<ExecResultTree> {

    return mapTree<ExecutionPlanNode, ExecutionResultNode>(plan, async (plan) => {
        const result = await plan.executor.execute(plan.query);
        return {
            query: plan.query,
            result,
            children: []
        }
    })
}

