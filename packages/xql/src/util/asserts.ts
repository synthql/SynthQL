import { isPresent } from "./isPresent";

export function assertArrayInResult(value: unknown, path: string): Array<{
    [key: string]: any;
}> {
    if (!Array.isArray(value)) {
        throw new Error(`Expected to find an array at path ${path} but found ${JSON.stringify(value, null, 2)}`);
    }
    return value.filter(isPresent);
}