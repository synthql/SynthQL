import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalState } from "./useGlobalState";

type LayoutDirection = 'vertical' | 'horizontal'

export function useLayoutDirection() {
    return useGlobalState<LayoutDirection>('app.layoutDirection', 'vertical')
}