import { DbSchema } from '../types/DbSchema';
import { Table } from '../types/Table';
import { getColumnDefs, getTableDef, isSelectableColumn } from './getTableDefs';

type SelectableColumnsType = Record<string, true>;

/**
 * Get all selectable columns of a table, as defined in the database schema.
 *
 * Example:
 *
 * ```ts
 * const select = getSelectableColumns<DB>(schema, 'actor');
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
 * @param table The name of the table
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
