import { Schema, TableDef } from '../types/Schema';

export function getTableNamesAndDefs<DB>(
    schema: Schema<DB>,
): [string, TableDef<DB>][] {
    return Object.entries(schema.properties);
}
