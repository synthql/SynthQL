import { AnyDB, AnyQuery, AnyTable, DeferredResult, QueryResult } from '@synthql/queries';
import { applyCardinality } from '../query/applyCardinality';
import { assertHasKey } from '../util/asserts/assertHasKey';
import { setIn } from '../util/tree/setIn';
import { ExecResultNode, ExecResultTree, ResultRow } from './types';

export function composeExecutionResults(
    tree: ExecResultTree,
): QueryResult<AnyDB, AnyTable> {
    const queryResult: ResultRow[] = tree.root.result;

    for (const node of tree.root.children) {
        composeExecutionResultsRecursively(node, queryResult);
    }

    return applyCardinalityAndDeferredResult(queryResult, tree.root.inputQuery) as QueryResult<AnyDB, AnyTable>;
}

function composeExecutionResultsRecursively(
    node: ExecResultNode,
    queryResult: ResultRow[],
) {
    const { inputQuery, path, filters, result } = node;

    setIn(queryResult, path, (parent) => {
        const predicate = (row: ResultRow) => {
            for (const filter of filters) {
                assertHasKey(parent, filter.parentColumn);
                const parentValue = parent[filter.parentColumn];

                assertHasKey(row, filter.childColumn);
                const childValue = row[filter.childColumn];
                if (parentValue !== childValue) {
                    return false;
                }
            }
            return true;
        };
        const rows = result.filter((row) => predicate(row));

        return applyCardinalityAndDeferredResult(rows, inputQuery);
    });

    for (const child of node.children) {
        composeExecutionResultsRecursively(child, queryResult);
    }
}

function applyDeferredQueryResult<T>(
    result: T,
    defer: boolean = false,
): DeferredResult<T> | T {
    if (!defer) {
        return result;
    }
    return { status: 'done', data: result };
}

function applyCardinalityAndDeferredResult<T>(
    rows: T[],
    inputQuery: AnyQuery,
) {
    const withCardinality = applyCardinality(rows, inputQuery.cardinality, {
        query: inputQuery,
        row: rows,
    });

    return applyDeferredQueryResult(withCardinality, inputQuery.lazy);
}
