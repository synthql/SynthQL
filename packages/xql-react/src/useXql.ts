import { Query, Table } from "xql";
import { useXqlContext } from "./XqlProvider";
import { useAyncGeneratorQuery } from "./useAsyncGeneratorQuery";
import { xqlQueryKey } from "./xqlQueryKey";

export function useXql<DB, TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(query: TQuery) {
    const { xqlEndpoint, requestInit } = useXqlContext();

    const queryKey = xqlQueryKey<DB, TTable, TQuery>(query);

    return useAyncGeneratorQuery({
        queryKey,
        queryFn: async () => {
            return fetchJsonl(xqlEndpoint, requestInit)
        },
    })
}

