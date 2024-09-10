import { QueryParameter } from './types/QueryParameter';

export function param<TValue = unknown>(
    value: TValue,
    id: string,
): QueryParameter<TValue> {
    return {
        type: 'synthql::parameter',
        value,
        id,
    };
}
