import { AnyContext, AnyQuery } from '@synthql/queries';
import { mapRecursive } from '../util/tree/mapRecursive';
import { SynthqlError } from '../SynthqlError';

export interface Middleware<
    TQuery extends AnyQuery,
    TContext extends AnyContext,
> {
    predicate: ({
        query,
        context,
    }: {
        query: TQuery;
        context: TContext;
    }) => boolean;
    transformQuery: ({
        query,
        context,
    }: {
        query: TQuery;
        context: TContext;
    }) => TQuery;
}

export function middleware<
    TQuery extends AnyQuery,
    TContext extends AnyContext,
>({
    predicate,
    transformQuery,
}: {
    predicate: ({
        query,
        context,
    }: {
        query: TQuery;
        context: TContext;
    }) => boolean;
    transformQuery: ({
        query,
        context,
    }: {
        query: TQuery;
        context: TContext;
    }) => TQuery;
}): Middleware<TQuery, TContext> {
    return {
        predicate,
        transformQuery,
    };
}

export const permissionsMiddleware = middleware<AnyQuery, AnyContext>({
    predicate: () => true,
    transformQuery: ({ query, context }) => {
        throwIfPermissionsMissing(query, context?.permissions);

        return query;
    },
});

function throwIfPermissionsMissing(
    query: AnyQuery,
    contextPermissions: AnyContext['permissions'] = [],
) {
    mapRecursive(query, (node) => {
        if (isQueryWithPermissions(node)) {
            const missingPermissions = node?.permissions
                ? node?.permissions.filter(
                      (permission) => !contextPermissions.includes(permission),
                  )
                : [];

            if (missingPermissions.length > 0) {
                throw SynthqlError.createPermissionsError({
                    query: node,
                    missingPermissions,
                    contextPermissions,
                });
            }
        }

        return node;
    });
}

function isQueryWithPermissions(
    x: any,
): x is AnyQuery & { permissions: string[] } {
    return Array.isArray(x?.permissions);
}
