import { resolveReferences } from "../../query/resolveReferences";
import { mapTree } from "../../util/tree/mapTree";
import { ExecuteProps } from "../execute";
import { TableRef } from "../../refs/TableRef";
import { ExecPlanTree, ExecResultTree, ExecutionPlanNode, ExecResultNode as ExecutionResultNode, Path, star } from "../types";
import { iterateResultRows } from "../../query/iterateResultRow";

export function executePlan(planTree: ExecPlanTree, { defaultSchema }: ExecuteProps): AsyncGenerator<ExecResultTree> {
    const executionContext = { refContext: planTree.refContext }
    return mapTree<ExecutionPlanNode, ExecutionResultNode>(planTree, async (planNode, parentNode): Promise<ExecutionResultNode> => {
        // Replace refs with values
        const query = resolveReferences(planNode.query, executionContext.refContext, defaultSchema);

        // Execute the query
        const rows = await planNode.executor.execute(query);

        // Collect refs from the result
        for (const { column, values: value } of iterateResultRows(rows, query, defaultSchema)) {
            executionContext.refContext.addValues(column, ...value)
        }

        return {
            path: calculatePath(planNode, parentNode),
            filters: [],
            inputQuery: planNode.inputQuery,
            result: rows,
            children: [],
        }
    })
}

function calculatePath(planNode: ExecutionPlanNode, parentNode?: ExecutionResultNode): Path {
    if (!parentNode) {
        return [star]
    }
    const parentPath = Array.from(parentNode.path)
    if (planNode.inputQuery.cardinality === 'many') {
        parentPath.push(star)
    }
    const { includeKey } = planNode.query
    if (includeKey !== undefined) {
        parentPath.push(includeKey)
    }
    return parentPath
}