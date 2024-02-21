import {
    AugmentedQuery
} from '../../../types';
import { assertArrayInResult } from '../../../util/asserts';
import { applyCardinality } from '../../../QueryEngine/applyCardinality';

interface Row {
    [key: string]: any;
}

type AnyObject = {
    [key: string]: any;
};

type AnyQueryResult =
    | undefined
    | Array<AnyQueryResult>
    | {
        [key: string]: any;
    };

export function hydrate(
    data: Array<Row>,
    query: AugmentedQuery,
): AnyQueryResult[] {
    const mapped = data.map((row) => hydrateRow(row, query));
    return mapped
}

function hydrateRow(row: Row, query: AugmentedQuery): AnyQueryResult {
    const result: AnyQueryResult = {};
    // Map the top root query:
    // This query is mapped by iterating the selected columns.
    for (const s of query.select) {
        // This is the simplest case, where we are selecting a column in the row
        // and mapping it to a column in the result.
        if (s.type === 'column') {
            result[s.column] = row[s.id];
        }
    }
    // Map the first level queries:
    // This query is mapped by iterating the jsonb_agg columns.
    for (const child of query.children) {
        for (const s of child.select) {
            if (s.type === 'jsonb_agg' && s.columns.length > 0) {
                const nested = assertArrayInResult(row[s.id], s.id);
                nested.forEach((nestedItem) =>
                    hydrateNestedMutating(row, child, nestedItem),
                );
                result[s.includeColumn] = applyCardinality(
                    nested,
                    child.query.cardinality ?? 'many',
                    {
                        row,
                        query: query.query,
                    },
                );
            }
        }
    }

    return result;
}

function hydrateNestedMutating(
    row: Row,
    parentQuery: AugmentedQuery,
    result: AnyObject,
): void {
    for (const childQuery of parentQuery.children) {
        for (const s of childQuery.select) {
            if (s.type === 'jsonb_agg') {
                const joinPredicate = (row: AnyObject) => true;

                const nested = assertArrayInResult(row[s.id], s.id).filter(
                    joinPredicate,
                );
                nested.forEach((nestedItem) =>
                    hydrateNestedMutating(row, childQuery, nestedItem),
                );
                result[s.includeColumn] = applyCardinality(
                    nested,
                    childQuery.query.cardinality ?? 'many',
                    {
                        row,
                        query: childQuery.query,
                    },
                );
            }
        }
    }
}
