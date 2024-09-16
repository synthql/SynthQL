import { QueryParameter } from './types/QueryParameter';

export function param<TValue = unknown>(
    value?: TValue,
): QueryParameter<TValue> {
    return {
        type: 'synthql::parameter',
        value,
        id: String(value),
    };
}
