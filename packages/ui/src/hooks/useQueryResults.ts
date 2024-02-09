import { useGlobalState } from "./useGlobalState";

type QueryResults = {
    query: any,
    results: any
}

export function useQueryResults() {
    return useGlobalState<QueryResults>('app.queryResults', {
        query: {},
        results: {}
    })
}