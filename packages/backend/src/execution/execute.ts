import { Query, QueryResult } from '@synthql/queries';
import { composeExecutionResults } from './composeExecutionResults';
import { createExecutionPlan } from './planning/createExecutionPlan';
import { executePlan } from './execution/executePlan';
import { QueryExecutor } from './types';

export interface ExecuteProps {
    executors: Array<QueryExecutor>;
    defaultSchema: string;
    prependSql?: string;
}

/**
 * Query execution is a 3-step process:
 *
 * ## {@link createExecutionPlan Create an execution plan}
 * This step takes a query tree as input and does the following:
 *
 * ### Executor assignment
 * This step assigns an executor to sub-trees of the query tree.
 *
 * ### Reference collection
 * This step collects refs that need to be extracted from the query tree.
 *
 * ## {@link executePlan Execute the plan}
 * Once every query has an executor assigned, we can start executing them.
 * The tree structure defines the order in which we execute the queries.
 * A child can only be executed after its parent, but siblings can be
 * executed in parallel.
 *
 * ## {@link composeExecutionResults Compose the results}
 * The results of the execution are a tree of results.
 * We need to compose them into a single result.
 *
 */
export async function* execute<DB, TQuery extends Query<DB>>(
    query: TQuery,
    props: ExecuteProps,
): AsyncGenerator<QueryResult<DB, TQuery>> {
    const plan = createExecutionPlan(query, props);

    for await (const resultTree of executePlan(plan, props)) {
        yield composeExecutionResults(resultTree);
    }
}
