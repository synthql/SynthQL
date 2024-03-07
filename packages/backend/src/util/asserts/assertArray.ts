import { Path } from "../../execution/types";

export function assertArray(obj: unknown): asserts obj is unknown[] {
    if (!Array.isArray(obj)) {
        throw new Error(`Expected an array but got ${JSON.stringify(obj)}`);
    }
}
