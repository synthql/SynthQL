import { AnyQuery } from './AnyQuery';

export interface RegularQueryRequest {
    type: 'RegularQuery';
    query: AnyQuery;
}

export interface RegisteredQueryRequest {
    type: 'RegisteredQuery';
    queryId: string;
    params: Record<string, unknown>;
}

export type QueryRequest = RegularQueryRequest | RegisteredQueryRequest;
