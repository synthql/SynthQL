export function sortRecursively<T>(input: T): T {
    // If the input is neither an object nor an array (i.e., primitive), return it directly.
    if (typeof input !== 'object' || input === null) {
        return input;
    }

    // If the input is an array, map through its elements to apply sortRecursively recursively,
    // and sort the array if it consists of primitives or objects.
    if (Array.isArray(input)) {
        return input.map(sortRecursively).sort((a, b) => {
            if (
                typeof a === 'object' &&
                a !== null &&
                typeof b === 'object' &&
                b !== null
            ) {
                return JSON.stringify(a).localeCompare(JSON.stringify(b));
            }
            return a < b ? -1 : a > b ? 1 : 0;
        }) as unknown as T;
    }

    // If the input is an object, create a new object where each value
    // has sortRecursively applied to it.
    const sortedObject: any = {};
    for (const [key, value] of Object.entries(input)) {
        sortedObject[key] = sortRecursively(value);
    }
    return sortedObject as T;
}
