import { ColumnSchema, DbSchema, TableSchema } from '../types/DbSchema';
import { Table } from '../types/Table';

function getTableDef<DB>(schema: DbSchema, table: Table<DB>): TableSchema {
    return schema.properties[table];
}

function getColumnDefs(tableDef: TableSchema): [string, ColumnSchema][] {
    return Object.entries(tableDef.properties.columns.properties);
}

function isSelectableColumn(columnDef: ColumnSchema): boolean {
    return columnDef.properties.selectable.const;
}

/**
 * Get all selectable columns of a table, as defined in the database schema.
 *
 * Example:
 *
 * ```ts
 * const select = getSelectableColumns(schema, 'actor');
 * ```
 *
 * @param schema The generated schema object for the database
 * @param table The name of the table.
 */

export function getSelectableColumns<DB>(schema: DbSchema, table: Table<DB>) {
    const select: Record<string, true> = {};

    const tableDef = getTableDef<DB>(schema, table);

    for (const [columnName, columnDef] of getColumnDefs(tableDef)) {
        if (isSelectableColumn(columnDef)) {
            select[columnName] = true;
        }
    }

    return select;
}
