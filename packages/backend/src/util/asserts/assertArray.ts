import { Path } from '../../execution/types';
import { printObj } from '../printObj';

export function assertArray(obj: unknown): asserts obj is unknown[] {
    if (!Array.isArray(obj)) {
        throw new Error(`Expected an array but got ${printObj(obj)}`);
    }
}
