export function iterateRecursively<T>(
    traversable: T,
    visitor: (traversable: unknown, path: string[]) => void,
    path: string[] = [],
): void {
    visitor(traversable, path);

    if (
        traversable === null ||
        typeof traversable !== 'object' ||
        traversable instanceof Date
    ) {
        return;
    }

    for (const [key, value] of Object.entries(traversable)) {
        iterateRecursively(value, visitor, [...path, key]);
    }
}
