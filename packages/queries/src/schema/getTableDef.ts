import { Schema, TableDef } from '../types/Schema';

export function getTableDef<DB>(
    schema: Schema<DB>,
    table: string,
): TableDef<DB> {
    return schema.properties[table];
}
