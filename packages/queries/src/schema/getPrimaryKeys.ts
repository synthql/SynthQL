import { DbSchema } from '../types/DbSchema';
import { Table } from '../types/Table';
import {
    getColumnNamesAndDefs,
    getTableDef,
    isPrimaryKeyColumn,
} from './getTableDefs';

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

export function getPrimaryKeys<DB>(
    schema: DbSchema<DB>,
    table: Table<DB>,
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
