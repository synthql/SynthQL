import { AnyQuery } from './AnyQuery';

export const RegularQuery = 'RegularQuery';
export const RegisteredQuery = 'RegisteredQuery';

export interface RegularQueryRequest {
    type: typeof RegularQuery;
    query: AnyQuery;
}

export interface RegisteredQueryRequestBody {
    queryId: string;
    params: Record<string, unknown>;
}

export interface RegisteredQueryRequest {
    type: typeof RegisteredQuery;
    queryId: RegisteredQueryRequestBody['queryId'];
    params: RegisteredQueryRequestBody['params'];
}

export type QueryRequest = RegularQueryRequest | RegisteredQueryRequest;