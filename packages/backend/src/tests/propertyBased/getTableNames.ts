import { Schema } from '@synthql/queries';

export function getTableNames<DB>(schema: Schema<DB>): string[] {
    return Object.keys(schema.properties);
}
