import { isPresent } from '../isPresent';
import { printObj } from '../printObj';

export function assertPresent<K, T extends K | null | undefined>(
    obj: T,
): asserts obj is NonNullable<T> {
    if (!isPresent(obj)) {
        throw new Error(
            `Expected value to be present but got: ${printObj(obj)}`,
        );
    }
}
