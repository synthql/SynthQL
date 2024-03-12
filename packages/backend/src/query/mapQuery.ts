import { Path, star } from "../execution/types";
import { AnyQuery } from "../types";

type Context<TQuery> = {
    parentQuery?: TQuery,
    includeKey?: string,
    /**
     * The path to the visited query, not the parent query.
     */
    childPath: Path
};

type MapFn<TQuery extends AnyQuery> = (
    inputQuery: AnyQuery,
    context?: Context<TQuery>
) => TQuery;

export function mapQuery<T extends AnyQuery>(
    query: AnyQuery,
    mapFn: MapFn<T>,
    context?: Context<T>
): T {
    const rootContext: Context<T> = {
        parentQuery: undefined,
        includeKey: undefined,
        childPath: [star]
    }
    const mapped = mapFn(query, context ?? rootContext);
    const include = { ...mapped.include };
    for (const [includeKey, subQuery] of Object.entries(include)) {
        const parentPath = (context ?? rootContext).childPath

        const path = subQuery.cardinality === 'many'
            ? [...parentPath, star, includeKey]
            : [...parentPath, includeKey]

        const childContext: Context<T> = {
            parentQuery: mapped,
            includeKey,
            childPath: path
        };

        include[includeKey] = mapQuery(
            subQuery,
            mapFn,
            childContext
        );
    }
    return {
        ...mapped,
        include,
    };
}