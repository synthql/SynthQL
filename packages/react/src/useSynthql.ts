import { Query, QueryResult, Table } from '@synthql/queries';
import { useSynthqlContext } from './SynthqlProvider';
import { useAyncGeneratorQuery } from './useAsyncGeneratorQuery';
import { synthqlQueryKey } from './synthqlQueryKey';
import { QueryOptions, UseQueryResult } from '@tanstack/react-query';
import { fetchJsonLines } from './fetchJsonLines';

type SynthqlQueryOptions<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = {
    requestInit?: RequestInit;
    returnLastOnly?: boolean;
    reactQuery?: Pick<QueryOptions<QueryResult<DB, TQuery>>, 'retry'>;
};

export function useSynthql<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
>(
    query: TQuery,
    opts: SynthqlQueryOptions<DB, TTable, TQuery> = {},
): UseQueryResult<QueryResult<DB, TQuery>> {
    const { endpoint, requestInit } = useSynthqlContext();

    const enrichedEndpoint = `${endpoint}/${query.from}`;

    const mergedRequestInit: RequestInit = {
        ...requestInit,
        ...opts.requestInit,
        headers: {
            ...requestInit?.headers,
            'X-Return-Last-Only': opts.returnLastOnly ? 'true' : 'false',
        },
        body: JSON.stringify(query),
    };

    const queryKey = synthqlQueryKey<DB, TTable, TQuery>(query, {
        endpoint: enrichedEndpoint,
        requestInit: mergedRequestInit,
    });

    return useAyncGeneratorQuery({
        queryKey,
        queryFn: async () => {
            return fetchJsonLines<QueryResult<DB, TQuery>>(
                enrichedEndpoint,
                mergedRequestInit,
            );
        },
        ...opts.reactQuery,
    });
}
