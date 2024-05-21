import { ColumnSchema, DbSchema, TableSchema } from '../types/DbSchema';
import { Table } from '../types/Table';

type SelectableColumnsType = Record<string, true>;

/**
 * Get all selectable columns of a table, as defined in the database schema.
 *
 * Example:
 *
 * ```ts
 * const select = getSelectableColumns(schema, 'actor');
 *
 * select =
 *   actor_id: true,
 *   first_name: true,
 *   last_name: true,
 *   last_update: true,
 * }
 * ```
 *
 * @param schema The generated schema object for the database
 * @param table The name of the table.
 */

export function getSelectableColumns<DB>(
    schema: DbSchema<DB>,
    table: Table<DB>,
): SelectableColumnsType {
    const select: SelectableColumnsType = {};

    const tableDef = getTableDef<DB>(schema, table);

    for (const [columnName, columnDef] of getColumnDefs<DB>(tableDef)) {
        if (isSelectableColumn(columnDef)) {
            select[columnName] = true;
        }
    }

    return select;
}

function getTableDef<DB>(
    schema: DbSchema<DB>,
    table: Table<DB>,
): TableSchema<DB> {
    return schema.properties[table];
}

function getColumnDefs<DB>(
    tableDef: TableSchema<DB>,
): [string, ColumnSchema][] {
    return Object.entries(tableDef.properties.columns.properties);
}

function isSelectableColumn(columnDef: ColumnSchema): boolean {
    return columnDef.properties.selectable.const;
}
