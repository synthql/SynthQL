import {
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { useGlobalState } from './useGlobalState';

type DatabaseUrl = string;

export function useDatabaseUrl() {
    return useGlobalState<DatabaseUrl>('app.databaseUrl', '');
}
