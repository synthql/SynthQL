import { AnyQuery } from '../types/AnyQuery';
import { isQueryParameter } from '../validators/isQueryParam';

// Copied from: https://github.com/TanStack/query/blob/353e4ad7291645f27de6585e9897b45e46c666fb/packages/query-core/src/utils.ts#L205
/**
 * Default query & mutation keys hash function.
 * Hashes the value into a stable hash.
 */
export function hashQuery(query: AnyQuery): string {
    return djb2Hash(
        JSON.stringify(query, (_, val) => {
            if (isQueryParameter(val)) {
                return val.id;
            }

            // Sort keys to guarantee a stable output
            return isPlainObject(val)
                ? Object.keys(val)
                      .sort()
                      .reduce((result, key) => {
                          result[key] = val[key];
                          return result;
                      }, {} as any)
                : val;
        }),
    );
}

// Copied from: https://github.com/jonschlinkert/is-plain-object
function isPlainObject(o: any): o is Object {
    if (!hasObjectPrototype(o)) {
        return false;
    }

    // If has no constructor
    const ctor = o.constructor;
    if (ctor === undefined) {
        return true;
    }

    // If has modified prototype
    const prot = ctor.prototype;
    if (!hasObjectPrototype(prot)) {
        return false;
    }

    // If constructor does not have an Object-specific method
    if (!prot.hasOwnProperty('isPrototypeOf')) {
        return false;
    }

    // Handles Objects created by Object.create(<arbitrary prototype>)
    if (Object.getPrototypeOf(o) !== Object.prototype) {
        return false;
    }

    // Most likely a plain Object
    return true;
}

function hasObjectPrototype(o: any): boolean {
    return Object.prototype.toString.call(o) === '[object Object]';
}

export function djb2Hash(str: string) {
    let hash = 5381;

    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }

    return (hash >>> 0).toString();
}
