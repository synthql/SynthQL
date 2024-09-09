import { QueryParameter } from './types/QueryParameter';

export function param<TValue = unknown>(
    id: string,
    value: TValue,
): QueryParameter<TValue> {
    return {
        type: 'synthql::parameter',
        id,
        value,
    };
}
