import {
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { useGlobalState } from './useGlobalState';

type Connection = {
    url: string;
    schema: string;
    name: string;
};

export function useConnection() {
    return useGlobalState<Connection>('app.connection', {
        schema: '',
        url: '',
        name: '',
    });
}
