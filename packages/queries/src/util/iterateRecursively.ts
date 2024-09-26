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

export function iterateRecursively<T extends Traversable>(
    traversable: T,
    visitor: (traversable: Traversable, path: string[]) => void,
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
