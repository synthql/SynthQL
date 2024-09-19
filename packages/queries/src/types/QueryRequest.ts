import { AnyQuery } from './AnyQuery';

export const RegularQuery = 'RegularQuery';
export const RegisteredQuery = 'RegisteredQuery';

export interface RegularQueryRequest {
    type: typeof RegularQuery;
    query: AnyQuery;
}

export interface RegisteredQueryRequest {
    type: typeof RegisteredQuery;
    queryId: string;
    params: Record<string, unknown>;
}

export type QueryRequest = RegularQueryRequest | RegisteredQueryRequest;
