import { Query } from "@synthql/queries";
import { AnyQuery } from "../types";
import { ExecPlanTree, ExecutionPlanNode, QueryExecutor } from "./types";
import { collectReferences } from "./references/collectReferences";
import { RefContext, createRefContext } from "./references/resolveReferences";
import { ColumnRef, TableRef } from "./executors/PgExecutor/queryBuilder/refs";
import { ExecuteProps } from "./execute";
import { createQueryTree, QueryNode } from "../util/createQueryTree";

export function createExecutionPlan(query: AnyQuery, props: ExecuteProps): ExecPlanTree {
    const { defaultSchema } = props;
    // Create an empty ref context.
    const refContext = createRefContext();

    // Collect all references in the query, but add no values as we don't have any yet.
    // Values will be added during the execution phase.
    for (const ref of collectReferences(query)) {
        const column = ColumnRef.fromRefOp(ref, defaultSchema);
        refContext.addValues(column);
    }

    const queryTree = createQueryTree(query);

    const root = assignExecutor(queryTree, refContext, props);

    return {
        root,
        refContext
    }
}

/**
 * Creates the ExecutionPlanNode tree by assigning executors to the query tree.
 */
function assignExecutor(queryNode: QueryNode, refContext: RefContext, props: ExecuteProps): ExecutionPlanNode {
    const { executors, defaultSchema } = props;
    for (const executor of executors) {
        const canExecute = executor.canExecute(queryNode);
        if (canExecute) {
            return {
                includeKey: canExecute.query.includeKey,
                executor,
                query: selectRefdColumns(canExecute.query.query, refContext, defaultSchema),
                inputQuery: canExecute.query.query,
                children: canExecute.remaining.map((subquery) => assignExecutor(subquery, refContext, props)),
            }
        }
    }

    throw new Error("No executor found for query");
}

/**
 * Maps every query in the tree by also selecting the columns that are referenced in the ref context and the where clause.
 */
function selectRefdColumns(query: AnyQuery, refContext: RefContext, defaultSchema: string): AnyQuery {
    const table = TableRef.fromQuery(defaultSchema, query);

    const refdColumns: ColumnRef[] = refContext.getColumns().filter(col => col.tableRef.equals(table));
    const whereColumns: ColumnRef[] = getColumnsInWhere(query, defaultSchema);
    const autoSelectColumns: ColumnRef[] = [...refdColumns, ...whereColumns];

    // Make a copy of the select object, so we don't mutate the original query.
    const select = structuredClone(query.select ?? {});

    // Add all referenced columns to the select object.
    for (const column of autoSelectColumns) {
        if (select[column.column]) {
            continue;
        }
        select[column.column] = true;
    }

    // Recursively select refd columns in the include object.
    const include = { ...query.include }
    for (const [key, subquery] of Object.entries(include)) {
        include[key] = selectRefdColumns(subquery, refContext, defaultSchema);
    }

    return {
        ...query,
        select,
        include,
    }
}

function getColumnsInWhere(query: AnyQuery, defaultSchema: string): ColumnRef[] {
    return Object.keys(query.where).map((column) => {
        return TableRef.fromQuery(defaultSchema, query).column(column);
    })
}