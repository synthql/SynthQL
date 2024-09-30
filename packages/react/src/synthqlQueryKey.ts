import { Query, Table } from '@synthql/queries';
import { QueryKey } from '@tanstack/react-query';

interface SynthqlQueryOptions {
    endpoint: string;
    requestInit?: RequestInit;
}

export type SynthqlQueryKey<
    DB = any,
    TTable extends Table<DB> = any,
    TQuery extends Query = Query,
> =
    | readonly ['synthql', TQuery]
    | readonly ['synthql', TQuery, SynthqlQueryOptions];

export function synthqlQueryKey<TQuery extends Query>(
    query: TQuery,
    opts?: SynthqlQueryOptions,
): SynthqlQueryKey<TQuery> {
    if (opts) {
        return ['synthql', query, opts];
    }

    return ['synthql', query];
}

export function isSynthqlQueryKey(
    key: QueryKey | SynthqlQueryKey,
): key is SynthqlQueryKey {
    if (key.length < 1) {
        return false;
    }

    return key[0] === 'synthql';
}
