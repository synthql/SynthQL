import { resolveReferences } from "../../query/resolveReferences";
import { mapTree } from "../../util/tree/mapTree";
import { ExecuteProps } from "../execute";
import { TableRef } from "../../refs/TableRef";
import { ExecPlanTree, ExecResultTree, ExecutionPlanNode, ExecResultNode as ExecutionResultNode, Path } from "../types";

export function executePlan(planTree: ExecPlanTree, { defaultSchema }: ExecuteProps): AsyncGenerator<ExecResultTree> {
    const executionContext = { refContext: planTree.refContext }
    return mapTree<ExecutionPlanNode, ExecutionResultNode>(planTree, async (planNode, parentNode): Promise<ExecutionResultNode> => {
        // Replace refs with values
        const query = resolveReferences(planNode.query, executionContext.refContext, defaultSchema);

        // Execute the query
        const rows = await planNode.executor.execute(query);

        // Collect refs from the result
        const table = TableRef.fromQuery(defaultSchema, query);
        const columns = executionContext.refContext.getColumns().filter(c => c.tableRef.equals(table));

        for (const row of rows) {
            const refContext = planNode.executor.collectRefValues(row, columns, planNode.inputQuery);
            executionContext.refContext.merge(refContext);
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
        return [{ type: 'anyIndex' }]
    }
    const parentPath = Array.from(parentNode.path)
    if (planNode.inputQuery.cardinality === 'many') {
        parentPath.push({ type: 'anyIndex' })
    }
    const { includeKey } = planNode.query
    if (includeKey !== undefined) {
        parentPath.push(includeKey)
    }
    return parentPath
}