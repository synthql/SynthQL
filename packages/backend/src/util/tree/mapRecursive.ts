export function mapRecursive<T>(
    item: T,
    visitor: (traversable: unknown) => T,
): T {
    const result = visitor(item);

    if (
        result === null ||
        typeof result !== 'object' ||
        result instanceof Date
    ) {
        return result;
    }

    for (const [key, value] of Object.entries(result)) {
        // @ts-ignore this operation is safe because we know that the result is an object
        result[key] = mapRecursive(value, visitor);
    }

    return result;
}
