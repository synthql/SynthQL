import { QueryResult } from "@synthql/queries";
import { ExecResultNode, ExecResultTree } from "./types";
import { applyCardinality } from "../QueryEngine/applyCardinality";
import { s } from "vitest/dist/reporters-O4LBziQ_.js";

export function composeExecutionResults(results: ExecResultTree): QueryResult<unknown, unknown> {
    return mapExecutionResultTree(results.root)
}

function mapExecutionResultTree(node: ExecResultNode): QueryResult<unknown, unknown> {

    return applyCardinality(node.result, node.query.cardinality ?? 'many') as QueryResult<unknown, unknown>;
}