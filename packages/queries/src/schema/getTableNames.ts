import { Schema } from '../types/Schema';

export function getTableNames<DB>(schema: Schema<DB>): string[] {
    return Object.keys(schema.properties);
}
