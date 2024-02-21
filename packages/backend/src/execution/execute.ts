import { Query, QueryResult, Table } from "@synthql/queries";
import { composeExecutionResults } from "./composeExecutionResults";
import { createExecutionPlan } from "./createExecutionPlan";
import { executePlan } from "./executePlan";
import { QueryExecutor } from "./types";

export interface ExecuteProps {
    executors: Array<QueryExecutor>;
}

/**
 * Query execution is a 3-step process:
 * 
 * 1. {@link createExecutionPlan Create an execution plan}
 * 2. {@link executePlan Execute the plan}
 * 3. {@link composeExecutionResults Compose the results}
 */
export async function* execute<DB, TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(query: Query<DB, TTable>, { executors }: ExecuteProps): AsyncGenerator<QueryResult<DB, TQuery>> {
    const plan = createExecutionPlan(query, executors);

    for await (const resultTree of executePlan(plan)) {
        yield composeExecutionResults(resultTree);
    }
}