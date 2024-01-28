export function isPresent<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}
export function isString(value: unknown): value is string {
    return typeof value === 'string';
}
