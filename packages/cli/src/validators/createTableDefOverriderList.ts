import { ColumnDefProperties, SchemaDefOverrides } from '@synthql/queries';

interface TableDefOverrider {
    isValidQualifiedTableName: (qualifiedTableName: string) => boolean;
    applyColumnDefOverride: (
        columnName: string,
    ) => Partial<ColumnDefProperties> | undefined;
}

type TableDefOverriderList = Array<TableDefOverrider>;

export function createTableDefOverriderList(
    schemaDefOverrides?: SchemaDefOverrides,
): TableDefOverriderList {
    const tableDefOverriderList: TableDefOverriderList = [];

    if (schemaDefOverrides) {
        const tablesToOverride = Object.keys(schemaDefOverrides);

        for (const qualifiedTableName of tablesToOverride) {
            const columnDefOverrides = schemaDefOverrides[qualifiedTableName];

            tableDefOverriderList.push({
                isValidQualifiedTableName: (qualifiedTableName) =>
                    schemaDefOverrides[qualifiedTableName] !== undefined,
                applyColumnDefOverride: (columnName) =>
                    columnDefOverrides
                        ? columnDefOverrides[columnName]
                        : undefined,
            });
        }
    }

    return tableDefOverriderList;
}
