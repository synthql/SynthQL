import { fc } from '@fast-check/vitest';

export function arbitraryLimit(): fc.Arbitrary<number> {
    return fc.integer({
        min: 1,
        max: 2147483647,
    });
}
