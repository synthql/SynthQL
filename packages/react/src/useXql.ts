import { Query, QueryResult, Table } from '@synthql/queries';
import { useXqlContext } from './XqlProvider';
import { useAyncGeneratorQuery } from './useAsyncGeneratorQuery';
import { xqlQueryKey } from './xqlQueryKey';
import { QueryOptions, UseQueryResult } from '@tanstack/react-query';

type XqlQueryOptions<DB, TTable extends Table<DB>, TQuery extends Query<DB, TTable>> = {
    requestInit?: RequestInit;
    reactQuery?: Pick<QueryOptions<QueryResult<DB, TQuery>>, 'retry'>;
}

export function useXql<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
>(
    query: TQuery,
    opts: XqlQueryOptions<DB, TTable, TQuery> = {}
): UseQueryResult<QueryResult<DB, TQuery>> {
    const { xqlEndpoint, requestInit } = useXqlContext();

    const queryKey = xqlQueryKey<DB, TTable, TQuery>(query);

    return useAyncGeneratorQuery({
        queryKey,
        queryFn: async () => {
            return fetchJsonl<QueryResult<DB, TQuery>>(
                xqlEndpoint,
                requestInit,
            );
        },
        ...opts.reactQuery,
    });
}

export type InferDB<TQuery> = TQuery extends Query<infer DB, infer Table>
    ? DB
    : never;
export type InferTable<TQuery> = TQuery extends Query<infer DB, infer Table>
    ? Table
    : never;
