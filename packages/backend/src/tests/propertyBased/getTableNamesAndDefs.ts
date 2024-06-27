import { Schema, TableDef } from '@synthql/queries';

export function getTableNamesAndDefs<DB>(
    schema: Schema<DB>,
): [string, TableDef<DB>][] {
    return Object.entries(schema.properties);
}
