import { RegularQuery, RegularQueryRequest } from '../types/QueryRequest';

export function isRegularQueryRequest(x: any): x is RegularQueryRequest {
    return x !== null && x !== undefined && x?.type === RegularQuery;
}
