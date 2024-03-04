import { mapTree } from "../util/mapTree";
import { ExecuteProps } from "./execute";
import { TableRef } from "./executors/PgExecutor/queryBuilder/refs";
import { resolveReferences } from "./references/resolveReferences";
import { ExecPlanTree, ExecResultTree, ExecutionPlanNode, ExecResultNode as ExecutionResultNode } from "./types";

export function executePlan(planTree: ExecPlanTree, { defaultSchema }: ExecuteProps): AsyncGenerator<ExecResultTree> {
    const executionContext = { refContext: planTree.refContext }
    return mapTree<ExecutionPlanNode, ExecutionResultNode>(planTree, async (planNode) => {
        // Replace refs with values
        const query = resolveReferences(planNode.query, executionContext.refContext, defaultSchema);

        // Execute the query
        const rows = await planNode.executor.execute(query);

        // Collect refs from the result
        const table = TableRef.fromQuery(defaultSchema, query);
        const columns = executionContext.refContext.getColumns().filter(c => c.tableRef.equals(table));

        for (const row of rows) {
            const refContext = planNode.executor.collectRefValues(row, columns);
            executionContext.refContext.merge(refContext);
        }

        return {
            inputQuery: planNode.inputQuery,
            result: rows,
            children: []
        }
    })
}