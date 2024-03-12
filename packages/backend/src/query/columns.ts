import { ColumnRef } from '../refs/ColumnRef';
import { TableRef } from '../refs/TableRef';
import { AnyQuery } from '../types';

export function columns(query: AnyQuery, defaultSchema: string): ColumnRef[] {
    const table = TableRef.fromQuery(defaultSchema, query);
    return Object.entries(query.select)
        .filter(([_, value]) => value === true)
        .map(([column, _]) => {
            return table.column(column);
        });
}
