// TODO: Unite/move this type with the one of the same
// name already being used in `backend` and `queries`
// See:
// packages/backend/src/execution/executors/PgExecutor/queryBuilder/exp.ts
// packages/queries/src/expression/Expression.ts
type Primitive =
    | string
    | number
    | boolean
    | null
    | undefined
    | symbol
    | bigint
    | Date;

type Traversable =
    | Primitive
    | { [key: string | number]: Traversable }
    | Array<Traversable>;

// TODO: possibly rename to better, more descriptive, OR
// create specific named wrappers that use it internally
export function iterateRecursively<T extends Traversable>(
    traversable: T,
    visitor: (traversable: Traversable, path: string[]) => void,
    path: string[] = [],
): void {
    // Apply the visitor to the current traversable
    visitor(traversable, path);

    if (
        typeof traversable === 'object' &&
        traversable !== null &&
        !(traversable instanceof Date)
    ) {
        if (Array.isArray(traversable)) {
            // If it's an array, iterate over each element
            // with its index as the key in the path
            traversable.forEach((item, index) => {
                iterateRecursively(item, visitor, [...path, String(index)]);
            });
        } else {
            // If it's an object, iterate over each
            // property with its key in the path
            for (const key in traversable) {
                if (Object.prototype.hasOwnProperty.call(traversable, key)) {
                    iterateRecursively(traversable[key], visitor, [
                        ...path,
                        String(key),
                    ]);
                }
            }
        }
    }
}
