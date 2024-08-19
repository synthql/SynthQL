import { Query, Table } from '@synthql/queries';
import { QueryKey } from '@tanstack/react-query';

interface SynthqlQueryOptions {
    endpoint: string;
    requestInit?: RequestInit;
}

export type SynthqlQueryKey<
    DB = any,
    TTable extends Table<DB> = any,
    TQuery extends Query<DB, TTable> = Query<DB, TTable>,
> =
    | readonly ['synthql', TQuery]
    | readonly ['synthql', TQuery, SynthqlQueryOptions];

export function synthqlQueryKey<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
>(
    query: TQuery,
    opts?: SynthqlQueryOptions,
): SynthqlQueryKey<DB, TTable, TQuery> {
    if (opts) {
        return ['synthql', query, opts];
    }

    return ['synthql', query];
}

export function isSynthqlQueryKey(key: QueryKey | SynthqlQueryKey): boolean {
    if (key.length < 1) {
        return false;
    }

    return key[0] === 'synthql';
}
