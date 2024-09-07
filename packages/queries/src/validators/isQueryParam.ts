import { QueryParam } from '../types/QueryParam';

export function isQueryParam(x: any): x is QueryParam {
    return x?.type === 'synthql::parameter' && typeof x?.id === 'string';
}
