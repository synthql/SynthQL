import { Query } from "@synthql/queries";
import { AnyQuery } from "../types";
import { ExecPlanTree, ExecutionPlanNode, QueryExecutor } from "./types";

export function createExecutionPlan(query: AnyQuery, executors: Array<QueryExecutor>): ExecPlanTree {
    const root = assignExecutor(query, executors);

    return {
        root,
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