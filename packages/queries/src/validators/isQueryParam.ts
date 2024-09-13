import { QueryParameter } from '../types/QueryParameter';

export function isQueryParameter(x: any): x is QueryParameter {
    return x !== null && x !== undefined && x?.type === 'synthql::parameter';
}
