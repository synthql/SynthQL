import {
    QueryOptions,
    UseQueryResult,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

export function useAyncGeneratorQuery<TData>({
    queryKey = [],
    queryFn,
    ...opts
}: QueryOptions<AsyncGenerator<TData>>): UseQueryResult<TData> {
    const queryClient = useQueryClient();

    const streamingQueryKey = [...queryKey, 'streaming-query-result'];

    const streamingQueryResult = useQuery({
        queryKey: streamingQueryKey,
        queryFn: async (): Promise<TData> => {
            return new Promise<TData>(() => {
                /* suspend forever */
            });
        },
        staleTime: Infinity,
    });

    useQuery({
        queryKey: [...queryKey, 'generator-fetcher'],
        queryFn: async (queryProps): Promise<AsyncGenerator<TData>> => {
            const generator = await queryFn!(queryProps);
            for await (const line of generator) {
                queryClient.setQueryData(streamingQueryKey, line);
            }
            return generator;
        },
        ...opts,
    });

    return streamingQueryResult;
}
