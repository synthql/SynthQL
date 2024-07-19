import { SchemaDefOverrides } from '@synthql/queries';

export function getUnappliedSchemaOverridesTableNames(
    tables: string[],
    defaultSchema: string,
    schemaDefOverrides?: SchemaDefOverrides,
) {
    const unappliedSchemaOverrideTableKeys: string[] = [];

    if (isObject(schemaDefOverrides)) {
        const tablesToOverride = Object.keys(schemaDefOverrides);

        for (const tableKey of tablesToOverride) {
            const [schemaName, tableName] = tableKey.split('.');

            if (schemaName === defaultSchema) {
                if (!tables.includes(tableName)) {
                    unappliedSchemaOverrideTableKeys.push(`- ${tableKey}`);
                }
            } else {
                if (!tables.includes(tableKey)) {
                    unappliedSchemaOverrideTableKeys.push(`- ${tableKey}`);
                }
            }
        }
    }

    return unappliedSchemaOverrideTableKeys;
}

export function isObject(value: unknown): value is object {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
