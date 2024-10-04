import { Schema, Table } from '@synthql/queries';

export function getTableNames<DB>(schema: Schema<DB>): Table<DB>[] {
    return Object.keys(schema.properties) as Table<DB>[];
}
