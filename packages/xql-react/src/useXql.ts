import { Query, QueryResult, Table } from "xql";
import { useXqlContext } from "./XqlProvider";
import { useAyncGeneratorQuery } from "./useAsyncGeneratorQuery";
import { xqlQueryKey } from "./xqlQueryKey";
import { QueryOptions, UseQueryResult } from "@tanstack/react-query";



export function useXql<DB, TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(query: TQuery, opts: Pick<QueryOptions<QueryResult<DB, TQuery>>, 'maxPages'> = {}): UseQueryResult<QueryResult<DB, TQuery>> {
    const { xqlEndpoint, requestInit } = useXqlContext();

    const queryKey = xqlQueryKey<DB, TTable, TQuery>(query);

    return useAyncGeneratorQuery({
        queryKey,
        queryFn: async () => {
            return fetchJsonl<QueryResult<DB, TQuery>>(xqlEndpoint, requestInit)
        },
        ...opts,
    })
}

export type InferDB<TQuery> = TQuery extends Query<infer DB, infer Table> ? DB : never;
export type InferTable<TQuery> = TQuery extends Query<infer DB, infer Table> ? Table : never;
