import { useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalState } from "./useGlobalState";

type IsConnected = {
    isConnected: boolean
}

export function useIsConnected() {
    return useGlobalState<IsConnected>('app.is-connected', {
        isConnected: false
    }, {
        persisted: false
    })
}