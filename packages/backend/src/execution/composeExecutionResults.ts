import { Value } from '@sinclair/typebox/value';
import { Query, QueryResult } from '@synthql/queries';
import { applyCardinality } from '../query/applyCardinality';
import { assertHasKey } from '../util/asserts/assertHasKey';
import { setIn } from '../util/tree/setIn';
import { ExecResultNode, ExecResultTree, ResultRow } from './types';

export function composeExecutionResults(
    tree: ExecResultTree,
): QueryResult<Query> {
    const queryResult: ResultRow[] = tree.root.result;

    for (const node of tree.root.children) {
        composeExecutionResultsRecursively(node, queryResult);
    }

    const result = applyCardinality(
        queryResult,
        tree.root.inputQuery.cardinality ?? 'many',
    ) as QueryResult<Query>;

    const schema = tree.root.inputQuery.schema;
    if (schema) {
        const error = Value.Errors(schema, [], result).First();
        if (error) {
            // TODO(fhur): Improve error message
            const lines = [
                `${error.message} at path: ${error.path}`,
                `Value: ${JSON.stringify(error.value)}`,
                `Schema: ${JSON.stringify(error.schema, null, 2)}`,
            ];
            throw new Error(lines.join('\n'));
        }
    }

    return result;
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
        return applyCardinality(rows, inputQuery.cardinality ?? 'many', {
            query: inputQuery,
            row: rows,
        });
    });

    for (const child of node.children) {
        composeExecutionResultsRecursively(child, queryResult);
    }
}
