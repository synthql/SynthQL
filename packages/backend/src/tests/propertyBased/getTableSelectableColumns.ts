import { Schema, Table } from '@synthql/queries';
import { getColumnNamesAndDefs } from './getColumnNamesAndDefs';
import { getTableDef } from './getTableDef';
import { isSelectableColumn } from './isSelectableColumn';

export function getTableSelectableColumns<DB>(
    schema: Schema<DB>,
    table: Table<DB>,
): string[] {
    const select: string[] = [];

    const tableDef = getTableDef<DB>(schema, table);

    for (const [columnName, columnDef] of getColumnNamesAndDefs<DB>(tableDef)) {
        if (isSelectableColumn(columnDef)) {
            select.push(columnName);
        }
    }

    return select;
}
