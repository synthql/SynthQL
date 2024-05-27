import { DbSchema } from '../types/DbSchema';
import { Table } from '../types/Table';
import { getColumnDefs, getTableDef, isPrimaryKeyColumn } from './getTableDefs';

/**
 * Get the primary key of a table, as defined in the database schema.
 *
 * Example:
 *
 * ```ts
 * const primaryKey = getPrimaryKey<DB>(schema, 'actor');
 *
 * console.log(primaryKey); // Prints 'actor_id'
 * ```
 *
 * @param schema The generated schema object for the database
 * @param table The name of the table
 */

export function getPrimaryKey<DB>(
    schema: DbSchema<DB>,
    table: Table<DB>,
): string {
    const tableDef = getTableDef<DB>(schema, table);

    for (const [columnName, columnDef] of getColumnDefs<DB>(tableDef)) {
        if (isPrimaryKeyColumn(columnDef)) {
            return columnName;
        }
    }

    return 'id';
}
