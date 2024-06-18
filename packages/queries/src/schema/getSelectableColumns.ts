import { AnySchema, Schema } from '../types/Schema';
import { Table } from '../types/Table';
import {
    getColumnNamesAndDefs,
    getColumnNamesAndDefsFromGenericTableDef,
    getTableDef,
    getTableDefFromGenericDbSchema,
    isSelectableColumn,
    isSelectableColumnFromGenericColumnDef,
    isWhereableColumnFromGenericColumnDef,
} from './getTableDefs';

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
    schema: Schema<DB>,
    table: Table<DB>,
): SelectableColumnsType {
    const select: SelectableColumnsType = {};

    const tableDef = getTableDef<DB>(schema, table);

    for (const [columnName, columnDef] of getColumnNamesAndDefs<DB>(tableDef)) {
        if (isSelectableColumn(columnDef)) {
            select[columnName] = true;
        }
    }

    return select;
}

export function getSelectableColumnsFromGenericDbSchema(
    schema: AnySchema,
    table: string,
): string[] {
    const select: string[] = [];

    const tableDef = getTableDefFromGenericDbSchema(schema, table);

    for (const [
        columnName,
        columnDef,
    ] of getColumnNamesAndDefsFromGenericTableDef(tableDef)) {
        if (isSelectableColumnFromGenericColumnDef(columnDef)) {
            select.push(columnName);
        }
    }

    return select;
}

export function getWhereableColumnsFromGenericDbSchema(
    schema: AnySchema,
    table: string,
): string[] {
    const where: string[] = [];

    const tableDef = getTableDefFromGenericDbSchema(schema, table);

    for (const [
        columnName,
        columnDef,
    ] of getColumnNamesAndDefsFromGenericTableDef(tableDef)) {
        if (isWhereableColumnFromGenericColumnDef(columnDef)) {
            where.push(columnName);
        }
    }

    return where;
}
