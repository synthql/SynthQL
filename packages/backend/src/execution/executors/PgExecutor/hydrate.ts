import { AugmentedQuery } from './queryBuilder/createAugmentedQuery';

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
    return mapped;
}

function hydrateRow(row: Row, query: AugmentedQuery): AnyQueryResult {
    const result: AnyQueryResult = {};

    for (const selection of query.selection) {
        selection.extractFromRow(row, result);
    }
    return result;
}
