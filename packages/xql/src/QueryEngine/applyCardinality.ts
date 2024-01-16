import { as } from "vitest/dist/reporters-O4LBziQ_";
import { AnyQuery, Cardinality } from "../types"

type CardinalityResult<TCardinality extends Cardinality, T> =
    TCardinality extends 'one' ? T :
    TCardinality extends 'maybe' ? T | null : T[];

export function applyCardinality<T, TCardinality extends Cardinality>(result: Array<T>, cardinality: TCardinality): CardinalityResult<TCardinality, T> {
    switch (cardinality) {
        case 'one': {
            if (result.length === 0) {
                throw new Error('applyCardinality(result,"one"): Expected at least one result, but got none');
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
    throw new Error(`applyCardinality(...,${cardinality}): Unreachable`)
}

const x = applyCardinality(['a'], 'maybe')