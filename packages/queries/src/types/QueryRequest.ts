import { AnyQuery } from './AnyQuery';

export interface RegularQueryRequest {
    type: 'RegularQuery';
    query: AnyQuery;
}

export interface RegisteredQueryRequest<TValue = unknown> {
    type: 'RegisteredQuery';
    queryId: string;
    params: Record<string, TValue>;
}

export type QueryRequest = RegularQueryRequest | RegisteredQueryRequest;
