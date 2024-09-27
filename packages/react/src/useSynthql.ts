import { Query, QueryResult } from '@synthql/queries';
import { QueryOptions, UseQueryResult } from '@tanstack/react-query';
import { fetchJsonLines } from './fetchJsonLines';
import { useSynthqlContext } from './SynthqlProvider';
import { synthqlQueryKey } from './synthqlQueryKey';
import { useAyncGeneratorQuery } from './useAsyncGeneratorQuery';

type SynthqlQueryOptions<TQuery extends Query> = {
    requestInit?: RequestInit;
    returnLastOnly?: boolean;
    reactQuery?: QueryOptions<TQuery>;
};

export function useSynthql<TQuery extends Query>(
    query: TQuery,
    opts: SynthqlQueryOptions<TQuery> = {},
): UseQueryResult<QueryResult<any, TQuery>> {
    const { endpoint, requestInit } = useSynthqlContext();

    const enrichedEndpoint = `${endpoint}/${query.name ?? query.from}-${query.hash}`;

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

    return useAyncGeneratorQuery({
        queryKey,
        queryFn: async () => {
            return fetchJsonLines<QueryResult<any, TQuery>>(
                enrichedEndpoint,
                mergedRequestInit,
            );
        },
        ...opts.reactQuery,
    });
}
