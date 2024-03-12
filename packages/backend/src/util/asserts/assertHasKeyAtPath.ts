import { Path } from '../../execution/types';
import { hasKey } from '../hasKey';
import { printObj } from '../printObj';

export function assertHasKeyAtPath(
    obj: unknown,
    path: Path,
    key: string,
): asserts obj is { [k: string]: unknown } {
    if (!hasKey(obj, key)) {
        throw new Error(
            `Expected an object with key ${key} at path: ${JSON.stringify(path)} but got: ${printObj(obj)}`,
        );
    }
}
