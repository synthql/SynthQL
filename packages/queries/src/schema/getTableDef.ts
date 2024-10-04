import { Schema, TableDef } from '../types/Schema';
import { Table } from '../types/Table';

export function getTableDef<DB>(
    schema: Schema<DB>,
    table: Table<DB>,
): TableDef<DB> {
    return schema.properties[table];
}
