import { Schema } from '../types/Schema';
import { getColumnNamesAndDefs } from './getColumnNamesAndDefs';
import { getTableDef } from './getTableDef';
import { isSelectableColumn } from './isSelectableColumn';

type SelectableColumnsRecordType = Record<string, true>;

/**
 * Get the selectable columns of a table, as defined in the database schema.
 *
 * Example:
 *
 * ```ts
 * const select = getSelectableColumns<DB>(schema, 'actor');
 *
 * select = {
 *   actor_id: true,
 *   first_name: true,
 *   last_name: true,
 *   last_update: true,
 * };
 * ```
 *
 * @param schema The generated schema object for the database
 * @param table The name of the table
 */

export function getTableSelectableColumns<DB>(
    schema: Schema<DB>,
    table: string,
): SelectableColumnsRecordType {
    const select: SelectableColumnsRecordType = {};

    const tableDef = getTableDef<DB>(schema, table);

    for (const [columnName, columnDef] of getColumnNamesAndDefs<DB>(tableDef)) {
        if (isSelectableColumn(columnDef)) {
            select[columnName] = true;
        }
    }

    return select;
}
