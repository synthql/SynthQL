import { Schema, TableDef } from '../types/Schema';

export function getTableDefs<DB>(schema: Schema<DB>): TableDef<DB>[] {
    return Object.values(schema.properties);
}
