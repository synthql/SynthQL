import { AnyContext, AnyQuery } from '@synthql/queries';

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
