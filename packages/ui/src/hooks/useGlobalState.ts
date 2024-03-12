import { useQuery, useQueryClient } from '@tanstack/react-query';

interface Opts {
    persisted: boolean;
}

export function useGlobalState<T>(
    queryKey: string,
    initialData: T,
    opts?: Opts,
): {
    data: T;
    setData: (newData: T | ((oldData: T | undefined) => T)) => void;
} {
    const queryClient = useQueryClient();
    const storedInitialData = readFromStorate(queryKey, initialData, opts);
    const { data } = useQuery({
        queryKey: [queryKey],
        queryFn: async (): Promise<T> => {
            return new Promise<T>(() => {});
        },
        initialData: storedInitialData,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return {
        data: data ?? initialData,
        setData: (newData: T | ((oldData: T | undefined) => T)) => {
            localStorage.setItem(queryKey, JSON.stringify(newData));
            queryClient.invalidateQueries({
                queryKey: [queryKey],
            });
            queryClient.setQueryData([queryKey], newData);
        },
    };
}

function readFromStorate<T>(
    queryKey: string,
    initialData: T,
    opts: Opts = {
        persisted: true,
    },
): T {
    if (opts.persisted == false) {
        return initialData;
    }
    const stored = localStorage.getItem(queryKey);
    if (stored === null) {
        return initialData;
    }
    return JSON.parse(stored);
}
