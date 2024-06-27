import { Schema } from '../types/Schema';
import { getColumnNamesAndDefs } from './getColumnNamesAndDefs';
import { getTableDef } from './getTableDef';
import { isPrimaryKeyColumn } from './isPrimaryKeyColumn';

/**
 * Get the primary key columns of a table, as defined in the database schema.
 *
 * Example:
 *
 * ```ts
 * const primaryKeys = getTablePrimaryKeyColumns<DB>(schema, 'actor');
 *
 * console.log(primaryKeys); // Prints '[actor_id]'
 * ```
 *
 * @param schema The generated schema object for the database
 * @param table The name of the table
 */

export function getTablePrimaryKeyColumns<DB>(
    schema: Schema<DB>,
    table: string,
): Array<string> {
    const primaryKeys: Array<string> = [];

    const tableDef = getTableDef<DB>(schema, table);

    for (const [columnName, columnDef] of getColumnNamesAndDefs<DB>(tableDef)) {
        if (isPrimaryKeyColumn(columnDef)) {
            primaryKeys.push(columnName);
        }
    }

    return primaryKeys;
}
