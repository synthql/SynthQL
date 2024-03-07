import { isObj } from "./isObj";



export function hasKey<T extends string>(obj: unknown, key: T): obj is {
    [k in T]: unknown;
} {
    if (!isObj(obj)) {
        return false;
    }
    return key in obj;
}
