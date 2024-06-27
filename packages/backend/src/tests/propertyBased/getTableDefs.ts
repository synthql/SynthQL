import { Schema, TableDef } from '@synthql/queries';

export function getTableDefs<DB>(schema: Schema<DB>): TableDef<DB>[] {
    return Object.values(schema.properties);
}
