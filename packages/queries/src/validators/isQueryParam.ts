import { QueryParam } from '../types/QueryParam';

export function isQueryParam(x: any): x is QueryParam {
    return (
        x?.type === 'synthql::param' &&
        (typeof x?.id === 'string' || typeof x?.id === 'number')
    );
}
