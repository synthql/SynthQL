import { Query, QueryResult } from '@synthql/queries';
import { QueryOptions, UseQueryResult } from '@tanstack/react-query';
import { fetchJsonLines } from './fetchJsonLines';
import { useSynthqlContext } from './SynthqlProvider';
import { synthqlQueryKey } from './synthqlQueryKey';
import { useAyncGeneratorQuery } from './useAsyncGeneratorQuery';

type SynthqlQueryOptions<TQuery extends Query> = {
    requestInit?: RequestInit;
    returnLastOnly?: boolean;
    /**
     * `@tanstack/react-query` options for the query.
     */
    reactQuery?: QueryOptions<AsyncGenerator<QueryResult<TQuery>>>;
};

export function useSynthql<TQuery extends Query>(
    query: TQuery,
    opts: SynthqlQueryOptions<TQuery> = {},
): UseQueryResult<QueryResult<TQuery>> {
    type ResultType = QueryResult<TQuery>;

    const { endpoint, requestInit } = useSynthqlContext();

    const enrichedEndpoint = `${endpoint}/${query.name ?? query.from}`;

    const mergedRequestInit: RequestInit = {
        ...requestInit,
        ...opts.requestInit,
        headers: {
            ...requestInit?.headers,
            'X-Return-Last-Only': opts.returnLastOnly ? 'true' : 'false',
        },
        body: JSON.stringify(query),
    };

    const queryKey = synthqlQueryKey<TQuery>(query, {
        endpoint: enrichedEndpoint,
        requestInit: mergedRequestInit,
    });

    return useAyncGeneratorQuery<ResultType>({
        queryKey,
        queryFn: (): AsyncGenerator<ResultType> => {
            return fetchJsonLines<ResultType>(
                enrichedEndpoint,
                mergedRequestInit,
            );
        },
        ...opts.reactQuery,
    });
}
