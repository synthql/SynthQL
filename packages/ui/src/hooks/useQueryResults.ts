import { useGlobalState } from './useGlobalState';

type QueryResults = {
    query: any;
    results: any;
    sql: string;
};

export function useQueryResults() {
    return useGlobalState<QueryResults>('app.queryResults', {
        query: {},
        results: {},
        sql: '',
    });
}
