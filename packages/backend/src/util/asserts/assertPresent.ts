import { isPresent } from '../isPresent';

export function assertPresent<K, T extends K | null | undefined>(
    obj: T,
): asserts obj is NonNullable<T> {
    if (!isPresent(obj)) {
        throw new Error(
            `Expected value to be present but got: ${JSON.stringify(obj)}`,
        );
    }
}
