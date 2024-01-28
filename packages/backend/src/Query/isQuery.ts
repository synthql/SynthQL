import { Query, Table } from '@xql/queries';

export function isQuery<DB, TTable extends Table<DB>>(
    x: unknown,
): x is Query<DB, TTable> {
    if (typeof x !== 'object') return false;
    if (x === null || x === undefined) return false;
    const keys = Object.keys(x);
    if (keys.length !== 3) return false;
    if (!keys.includes('from')) return false;
    if (!keys.includes('where')) return false;
    if (!keys.includes('select')) return false;
    return true;
}
