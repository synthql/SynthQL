import { Path } from '../../execution/types';

export function assertArrayAtPath(
    obj: unknown,
    path: Path,
): asserts obj is unknown[] {
    if (!Array.isArray(obj)) {
        throw new Error(
            `Expected an array at path ${JSON.stringify(path)} but got ${JSON.stringify(obj)}`,
        );
    }
}
