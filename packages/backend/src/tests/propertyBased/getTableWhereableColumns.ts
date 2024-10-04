import { Schema, Table } from '@synthql/queries';
import { getColumnNamesAndDefs } from './getColumnNamesAndDefs';
import { getTableDef } from './getTableDef';
import { isWhereableColumn } from './isWhereableColumn';

export function getTableWhereableColumns<DB>(
    schema: Schema<DB>,
    table: Table<DB>,
): string[] {
    const where: string[] = [];

    const tableDef = getTableDef<DB>(schema, table);

    for (const [columnName, columnDef] of getColumnNamesAndDefs<DB>(tableDef)) {
        if (isWhereableColumn(columnDef)) {
            where.push(columnName);
        }
    }

    return where;
}
