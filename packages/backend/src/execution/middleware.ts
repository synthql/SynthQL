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

export const aclMiddleware = middleware<AnyQuery, AnyContext>({
    predicate: ({ query, context }) => {
        const missingPermissions: string[] = [];

        mapRecursive(query, (node) => {
            if (isQueryWithPermissions(node)) {
                if (
                    !(node?.permissions ?? []).every((item) => {
                        if (context?.permissions?.includes(item)) {
                            return true;
                        } else {
                            missingPermissions.push(item);
                            return false;
                        }
                    })
                ) {
                    throw SynthqlError.createPermissionsError({
                        node,
                        missingPermissions,
                        contextPermissions: context?.permissions ?? [],
                    });
                }
            }

            return node;
        });

        return true;
    },
    transformQuery: ({ query }) => query,
});

function isQueryWithPermissions(x: any): x is AnyQuery {
    return Array.isArray(x?.permissions);
}
