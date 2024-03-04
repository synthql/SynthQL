import { QueryResult } from "@synthql/queries";
import { ExecResultNode, ExecResultTree } from "./types";
import { applyCardinality } from "../QueryEngine/applyCardinality";
import { AnyQuery } from "../types";

export function composeExecutionResults(results: ExecResultTree): QueryResult<unknown, unknown> {
    //printExecResultTree(results)
    return mapExecutionResultTree(results.root)
}

function mapExecutionResultTree(node: ExecResultNode): QueryResult<unknown, unknown> {
    const withSelectionApplied = selectColumns(node.result, node.inputQuery);

    return applyCardinality(withSelectionApplied, node.inputQuery.cardinality ?? 'many') as QueryResult<unknown, unknown>;
}

function selectColumns(rows: Array<{ [k: string]: unknown }>, query: AnyQuery) {
    const selectedColumns = Object.keys(query.select);

    for (const [includeKey, include] of Object.entries(query.include ?? {})) {
        if (Object.keys(include.select).length > 0) {
            selectedColumns.push(includeKey)
        }
    }

    return rows.map(row => {
        const newRow: { [k: string]: unknown } = {}
        for (const key of selectedColumns) {

            newRow[key] = (row)[key]
        }
        return newRow
    })
}