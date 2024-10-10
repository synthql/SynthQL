import { AnyDB, AnyQuery, RefOp } from '@synthql/queries';
import { RefContext } from '../refs/RefContext';
import { ColumnRef } from '../refs/ColumnRef';
import { QueryNode } from '../query/createQueryTree';

/**
 * # Execution Plan
 *
 * The execution plan tree describes the steps that
 * need to be taken to execute a query, as well as
 * which strategies are taken to execute each query.
 *
 * A parent → child relationship between nodes means that
 * the parent needs to be executed before the child.
 *
 * Example:
 *
 * ```
 *        DB
 *      /    \
 *     DB     http
 *     |       |  \
 *    http     DB  http
 * ```
 *
 * In this example, the root node is executed using the DB executor.
 * Once the root node is executed, the two children nodes can be
 * executed in parallel.
 */
export interface ExecPlanTree {
    /**
     * The context that is used to resolve references in the query.
     *
     * Note that at this point, the context is empty.
     * Values will be added during the execution phase.
     */
    refContext: RefContext;

    root: ExecutionPlanNode;
}

export interface ExecutionPlanNode {
    /**
     * The query that was given as input to the planner.
     */
    inputQuery: AnyQuery;

    /**
     * The query that will be executed. This query,
     * is derived from the input query. In particular,
     * it might have more columns selected.
     */
    query: PlanningQuery;

    executor: QueryExecutor;

    children: ExecutionPlanNode[];
}

export interface PlanningQuery extends AnyQuery {
    includeKey: string | undefined;
    parentQuery: PlanningQuery | undefined;
    path: Path;
    include: { [k: string]: PlanningQuery };
}

/**
 * A query executor does two things:
 *
 * 1. It checks if it can execute a query
 *  (see {@link QueryExecutor.canExecute}).
 * 2. It execute queries (see {@link QueryExecutor.execute}).
 */
export interface QueryExecutor<T extends ResultRow = ResultRow> {
    /**
     * Execute a query and return the result.
     */
    execute: (
        query: AnyQuery,
        opts: { defaultSchema: string; prependSql?: string },
    ) => Promise<Array<T>>;

    /**
     * If the executor supports the query, it returns
     * the query along with all its supported subqueries.
     *
     * If the executor does not support the query,
     * it returns undefined.
     */
    canExecute<TQuery extends AnyQuery>(
        query: TQuery,
    ):
        | {
              query: TQuery;
              remaining: TQuery[];
          }
        | undefined;
}

/**
 * The result of executing a plan.
 *
 * It contains the results of each query in the plan.
 */
export interface ExecResultTree {
    root: ExecResultNode;
}

export type ResultRow = {
    [k: string]: number | string | boolean | null | ResultRow[] | ResultRow;
};

export interface ExecResultNode {
    /**
     * The path describes the location in the query result
     * where the `result` rows should be written to.
     *
     * Example:
     * - A path of `[]` points to the root of the query result.
     * - A path of `[star, 'users']` indicates that at every item
     * in the root, a `users` key should be added.
     *
     *   Example:
     *   ```
     *   [{id: 1}, {id: 2}] => [{id: 1, users: [...]}, {id: 2, users: [...]}]
     *   ```
     */
    path: Path;

    /**
     * A `path` tells us where to write, but it doesn't tell us
     * which `result` rows to write to the query result.
     *
     * The `filters` array tells us which rows to write.
     *
     * The `parentColumn` is the column in the parent row
     * that we need to match.
     * The `childColumn` is the column in the result row
     * that we need to match.
     *
     * Example:
     * - `[{ op: '=', parentColumn: 'id', childColumn: 'user_id' }]`
     * means that we need to match the `id` column in the parent row
     * with the `user_id` column in the result row.
     *
     * - `[{ op: '=', parentColumn: 'id', childColumn: 'user_id' },
     * { op: '=', parentColumn: 'type', childColumn: 'user_type' }]`
     * means that we need to match the `id` column in the parent row
     * with the `user_id` column in the result row, and the `type` column
     * in the parent row with the `user_type` column in the result row.
     */
    filters: Array<{ op: '='; parentColumn: string; childColumn: string }>;
    /**
     * The rows that were returned by the executor.
     */
    result: ResultRow[];
    /**
     * The original query that was executed.
     */
    inputQuery: AnyQuery;
    planNode: ExecutionPlanNode;
    children: ExecResultNode[];
}

export type Path = Array<string>;
