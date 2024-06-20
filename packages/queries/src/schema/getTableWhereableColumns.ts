import { Schema } from '../types/Schema';
import { getColumnNamesAndDefs } from './getColumnNamesAndDefs';
import { getTableDef } from './getTableDef';
import { isWhereableColumn } from './isWhereableColumn';

export function getTableWhereableColumns<DB>(
    schema: Schema<DB>,
    table: string,
): string[] {
    const where: string[] = [];

    const tableDef = getTableDef(schema, table);

    for (const [columnName, columnDef] of getColumnNamesAndDefs(tableDef)) {
        if (isWhereableColumn(columnDef)) {
            where.push(columnName);
        }
    }

    return where;
}
