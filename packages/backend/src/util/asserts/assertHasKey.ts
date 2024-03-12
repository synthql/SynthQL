import { Path } from '../../execution/types';
import { hasKey } from '../hasKey';
import { printObj } from '../printObj';

export function assertHasKey<T extends string>(
    obj: unknown,
    key: T,
): asserts obj is { [k in T]: unknown } {
    if (!hasKey(obj, key)) {
        throw new Error(
            `Expected an object to have key ${key} but got: ${printObj(obj)}`,
        );
    }
}
