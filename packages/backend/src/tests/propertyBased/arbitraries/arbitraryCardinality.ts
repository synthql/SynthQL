import { fc } from '@fast-check/vitest';
import { Cardinality } from '@synthql/queries';

export function arbitraryCardinality(
    cardinality: Cardinality,
): fc.Arbitrary<Cardinality> {
    return fc.constant(cardinality);
}
