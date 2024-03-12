export function isObj(obj: unknown): obj is { [k: string]: unknown } {
    if (Array.isArray(obj)) {
        return false;
    }
    if (obj === null || obj === undefined) {
        return false;
    }
    if (typeof obj !== 'object') {
        return false;
    }
    return true;
}
