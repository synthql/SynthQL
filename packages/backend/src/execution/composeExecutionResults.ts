import { QueryResult } from '@synthql/queries';
import { applyCardinality } from '../query/applyCardinality';
import { AnyDb, AnyQuery, AnyTable } from '../types';
import { assertHasKey } from '../util/asserts/assertHasKey';
import { setIn } from '../util/tree/setIn';
import { ExecResultNode, ExecResultTree, Path, ResultRow } from './types';

export function composeExecutionResults(
    tree: ExecResultTree,
): QueryResult<AnyDb, AnyTable> {
    const queryResult: ResultRow[] = tree.root.result;

    for (const node of tree.root.children) {
        composeExecutionResultsRecursively(node, queryResult);
    }

    return applyCardinality(
        queryResult,
        tree.root.inputQuery.cardinality ?? 'many',
    ) as QueryResult<AnyDb, AnyTable>;
}

function composeExecutionResultsRecursively(
    node: ExecResultNode,
    queryResult: ResultRow[],
) {
    const { inputQuery, path, filters, result } = node;

    setIn(queryResult, path, (parent) => {
        const predicate = (row: ResultRow) => {
            for (const filter of filters) {
                assertHasKey(row, filter.childColumn);
                assertHasKey(parent, filter.parentColumn);
                if (row[filter.childColumn] !== parent[filter.parentColumn]) {
                    return false;
                }
            }
            return true;
        };
        const rows = result.filter((row) => predicate(row));
        return applyCardinality(rows, inputQuery.cardinality ?? 'many');
    });

    for (const child of node.children) {
        composeExecutionResultsRecursively(child, queryResult);
    }
}
