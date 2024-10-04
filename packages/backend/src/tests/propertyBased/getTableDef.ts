import { Schema, Table, TableDef } from '@synthql/queries';

export function getTableDef<DB>(
    schema: Schema<DB>,
    table: Table<DB>,
): TableDef<DB> {
    return schema.properties[table];
}
