import { RefOp } from "@synthql/queries";
import { AnyDb, AnyQuery } from "../types";
import { RefContext } from "./resolveReferences";

/**
 * # Execution Plan
 * 
 * The execution plan tree describes the steps that need to be taken to execute a query,
 * as well as which strategies are taken to execute each query.
 * 
 * A parent → child relationship between nodes means that parent needs to be executed before child.
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
 * In this example, the root node is executed using the DB executor. Once the root node is executed, the two children nodes can be executed in parallel.
 * 
 * 
 */
export interface ExecPlanTree {
    /**
     * The context that is used to resolve references in the query.
     * 
     * Note that at this point, the context is empty. Values will be added during the execution phase.
     */
    refContext: RefContext,

    root: ExecutionPlanNode,
}

export interface ExecutionPlanNode {
    /**
     * The query associated with this node.
     */
    query: AnyQuery

    executor: QueryExecutor

    children: ExecutionPlanNode[]
}

/**
 * A query executor does two things:
 * 
 * 1. It checks if it can execute a query (see {@link QueryExecutor.canExecute}).
 * 2. It execute queries (see {@link QueryExecutor.execute}).
 */
export interface QueryExecutor<T = unknown> {
    /**
     * Execute a query and return the result.
     * Also populate the refContext with the values obtained from the query.
     */
    execute: (query: AnyQuery, { refContext }: { refContext: RefContext }) => Promise<Array<T>>

    /**
     * If the executor supports the query, it returns the query along with all it's supported subqueries.
     * If the executor does not support the query, it returns undefined.
     */
    canExecute(query: AnyQuery): {
        query: AnyQuery,
        remaining: AnyQuery[]
    } | undefined
}

/**
 * The result of executing a plan.
 * 
 * It contains the results of each query in the plan.
 */
export interface ExecResultTree {
    root: ExecResultNode
}

export interface ExecResultNode {
    query: AnyQuery,
    result: any[],
    children: ExecResultNode[]
}

