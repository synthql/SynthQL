import { RegisteredQuery, RegisteredQueryRequest } from '../types/QueryRequest';

export function isRegisteredQueryRequest(x: any): x is RegisteredQueryRequest {
    return x !== null && x !== undefined && x?.type === RegisteredQuery;
}
