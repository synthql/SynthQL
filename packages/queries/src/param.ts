import { QueryParam } from './types/QueryParam';

export function param<TValue = unknown>(
    id: string,
    value: TValue,
): QueryParam<TValue> {
    return {
        type: 'synthql::param',
        id,
        value,
    };
}
