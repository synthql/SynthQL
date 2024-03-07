import { AnyQuery } from "../types";
import { Cardinality } from '@synthql/queries';

type CardinalityResult<
    TCardinality extends Cardinality,
    T,
> = TCardinality extends 'one'
    ? T
    : TCardinality extends 'maybe'
    ? T | null
    : T[];

export function applyCardinality<T, TCardinality extends Cardinality>(
    result: Array<T>,
    cardinality: TCardinality,
    opts?: { query: AnyQuery; row: any },
): CardinalityResult<TCardinality, T> {
    switch (cardinality) {
        case 'one': {
            if (result.length === 0) {
                throw new CardinalityError(cardinality, opts?.query, opts?.row);
            }
            const first = result[0];
            return first as CardinalityResult<TCardinality, T>;
        }
        case 'maybe': {
            if (result.length === 0) {
                return null as CardinalityResult<TCardinality, T>;
            }
            return result[0] as CardinalityResult<TCardinality, T>;
        }
        case 'many': {
            return result as CardinalityResult<TCardinality, T>;
        }
    }
    throw new Error(`applyCardinality(...,${cardinality}): Unreachable`);
}

class CardinalityError extends Error {
    constructor(cardinality: Cardinality, query?: AnyQuery, row?: any) {
        super(
            [
                `Expected cardinality ${cardinality} but got none.`,
                `The query was ${JSON.stringify(query, null, 2)}`,
                `The row was ${JSON.stringify(row, null, 2)}`,
            ].join('\n'),
        );
    }
}
