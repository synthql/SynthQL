import { Schema, TableDef } from '@synthql/queries';

export function getTableDef<DB>(
    schema: Schema<DB>,
    table: string,
): TableDef<DB> {
    return schema.properties[table];
}
