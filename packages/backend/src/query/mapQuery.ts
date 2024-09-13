import { AnyQuery, Cardinality } from '@synthql/queries';
import { Path } from '../execution/types';

type Context<TQuery> = {
    parentQuery?: TQuery;
    includeKey?: string;
    /**
     * The path to the visited query, not the parent query.
     */
    childPath: Path;
};

type MapFn<TQuery extends AnyQuery> = (
    inputQuery: AnyQuery,
    context: Context<TQuery>,
) => TQuery;

export function mapQuery<T extends AnyQuery>(
    query: AnyQuery,
    mapFn: MapFn<T>,
    context?: Context<T>,
): T {
    const rootContext: Context<T> = {
        parentQuery: undefined,
        includeKey: undefined,
        childPath: [],
    };
    const mapped = mapFn(query, context ?? rootContext);
    const include = { ...query.include };
    for (const [includeKey, subQuery] of Object.entries(include)) {
        const parentPath = (context ?? rootContext).childPath;

        const childPath = calculatePath(
            parentPath,
            subQuery.cardinality ?? 'many',
            includeKey,
        );

        const childContext: Context<T> = {
            parentQuery: mapped,
            includeKey,
            childPath,
        };

        include[includeKey] = mapQuery(subQuery, mapFn, childContext);
    }
    return {
        ...mapped,
        include,
    };
}

function calculatePath(
    parentPath: Path,
    childCardinality: Cardinality,
    includeKey: string,
) {
    return [...parentPath, includeKey];
}
