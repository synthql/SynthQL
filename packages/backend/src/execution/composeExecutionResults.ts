import { QueryResult } from "@synthql/queries";
import { ExecResultNode, ExecResultTree } from "./types";
import { applyCardinality } from "../QueryEngine/applyCardinality";

export function composeExecutionResults(results: ExecResultTree): QueryResult<unknown, unknown> {
    printExecResultTree(results)
    return mapExecutionResultTree(results.root)
}

function mapExecutionResultTree(node: ExecResultNode): QueryResult<unknown, unknown> {

    return applyCardinality(node.result, node.query.cardinality ?? 'many') as QueryResult<unknown, unknown>;
}

function printExecResultTree(tree: ExecResultTree) {
    const queue = [{ node: tree.root, depth: 0 }];
    console.log('----')
    while (queue.length > 0) {
        const { node, depth } = queue.shift()!;
        console.log('-'.repeat(depth * 4) + "> query: ", node.query.from, node.query.select);
        console.log('-'.repeat(depth * 4) + "> result: ", node.result);
        queue.push(...node.children.map((node) => ({ node, depth: depth + 1 })));
    }
}