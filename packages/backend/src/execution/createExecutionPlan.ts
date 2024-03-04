import { Query } from "@synthql/queries";
import { AnyQuery } from "../types";
import { ExecPlanTree, ExecutionPlanNode, QueryExecutor } from "./types";
import { collectReferences } from "./references/collectReferences";
import { RefContext, createRefContext } from "./references/resolveReferences";
import { TableRef } from "./executors/PgExecutor/queryBuilder/refs";
import { ExecuteProps } from "./execute";

export function createExecutionPlan(query: AnyQuery, { executors, defaultSchema }: ExecuteProps): ExecPlanTree {
    // Create an empty ref context.
    const refContext = createRefContext(defaultSchema);

    // Collect all references in the query, but add no values as we don't have any yet.
    // Values will be added during the execution phase.
    for (const ref of collectReferences(query)) {
        refContext.addValues(ref);
    }

    const rootWithRefdColumns = selectRefdColumns(query, refContext, defaultSchema);

    const root = assignExecutor(rootWithRefdColumns, executors);

    return {
        root,
        refContext
    }
}

/**
 * Creates the ExecutionPlanNode tree by assigning executors to the query tree.
 */
function assignExecutor(query: AnyQuery, executors: Array<QueryExecutor>): ExecutionPlanNode {
    for (const executor of executors) {
        const canExecute = executor.canExecute(query);
        if (canExecute) {
            return {
                executor,
                query: canExecute.query,
                children: canExecute.remaining.map((subquery) => assignExecutor(subquery, executors)),
            }
        }
    }

    throw new Error("No executor found for query");
}

/**
 * Maps every query in the tree by also selecting the columns that are referenced in the ref context.
 */
function selectRefdColumns(query: AnyQuery, refContext: RefContext, defaultSchema: string): AnyQuery {
    const table = TableRef.fromQuery(defaultSchema, query);

    const refdColumns = refContext.getColumns().filter(col => col.tableRef.equals(table));

    // Make a copy of the select object, so we don't mutate the original query.
    const select = { ...query.select };

    // Add all referenced columns to the select object.
    for (const column of refdColumns) {
        if (select[column.column]) {
            continue;
        }
        select[column.column] = true;
    }

    // Recursively select refd columns in the include object.
    const include = (query.include ?? {})
    for (const [key, subquery] of Object.entries(include)) {
        include[key] = selectRefdColumns(subquery, refContext, defaultSchema);
    }

    return {
        ...query,
        select,
        include,
    }
}
