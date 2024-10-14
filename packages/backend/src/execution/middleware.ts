export interface Middleware<TQuery = unknown, TContext = unknown> {
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

export function middleware<TQuery = unknown, TContext = unknown>({
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
