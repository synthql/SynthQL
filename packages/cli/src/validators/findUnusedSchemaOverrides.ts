import { SchemaDefOverrides } from '../types/CliConfig';

export function findUnusedSchemaOverrides(
    existingTables: string[],
    defaultSchema: string,
    schemaOverrides?: SchemaDefOverrides,
): string[] {
    if (schemaOverrides === undefined) {
        return [];
    }

    return Object.keys(schemaOverrides).flatMap((qualifiedTableName) => {
        const [schemaName, tableName] = qualifiedTableName.split('.');

        const isDefaultSchema = schemaName === defaultSchema;

        const tableToCheck = isDefaultSchema ? tableName : qualifiedTableName;

        return !existingTables.includes(tableToCheck)
            ? [qualifiedTableName]
            : [];
    });
}
