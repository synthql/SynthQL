import { DeferredResult } from '../types/QueryResult';

export function isDeferredResult<T = unknown>(x: any): x is DeferredResult<T> {
    return (
        x !== null &&
        x !== undefined &&
        (x?.status === 'pending' ||
            x?.status === 'done' ||
            x?.status === 'error')
    );
}
