import { Query } from "@synthql/queries";
import { AnyQuery } from "../types";
import { ExecPlanTree, ExecutionPlanNode, QueryExecutor } from "./types";
import { collectReferences } from "./references/collectReferences";
import { createRefContext } from "./references/resolveReferences";

export function createExecutionPlan(query: AnyQuery, executors: Array<QueryExecutor>): ExecPlanTree {
    const root = assignExecutor(query, executors);

    // Create an empty ref context.
    const refContext = createRefContext();

    // Collect all references in the query, but add no values as we don't have any yet.
    // Values will be added during the execution phase.
    for (const ref of collectReferences(query)) {
        refContext.addValues(ref);
    }

    return {
        root,
        refContext
    }
}

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