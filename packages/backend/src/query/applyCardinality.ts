import { SynthqlError } from '../SynthqlError';
import { AnyQuery } from '../types';
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
                throw SynthqlError.createCardinalityError();
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
