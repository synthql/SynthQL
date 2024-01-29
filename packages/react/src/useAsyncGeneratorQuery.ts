import { QueryOptions, UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';

export function useAyncGeneratorQuery<TData>({
    queryKey = [],
    queryFn,
    ...opts
}: QueryOptions<AsyncGenerator<TData>>): UseQueryResult<TData> {
    const queryClient = useQueryClient();

    const streamingQueryResult = useQuery({
        queryKey: [...queryKey, 'streaming-query-result'],
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
            for await (const result of generator) {
                queryClient.setQueryData([...queryKey, 'streaming-query-result'], result);
            }
            return generator;
        },
        ...opts,
    });

    return streamingQueryResult;
}
