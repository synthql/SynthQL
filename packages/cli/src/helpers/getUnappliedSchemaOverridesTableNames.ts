import { isObject } from './isValidSchemaDefOverrides';

export function getUnappliedSchemaOverridesTableNames(
    tables: string[],
    schemaDefOverrides: unknown,
    defaultSchema: string,
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
