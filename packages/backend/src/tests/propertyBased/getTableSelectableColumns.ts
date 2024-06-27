import { Schema } from '@synthql/queries';
import { getColumnNamesAndDefs } from './getColumnNamesAndDefs';
import { getTableDef } from './getTableDef';
import { isSelectableColumn } from './isSelectableColumn';

export function getTableSelectableColumns<DB>(
    schema: Schema<DB>,
    table: string,
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
