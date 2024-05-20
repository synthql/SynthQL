import { DbSchema } from './types/schemas';

export function getColumns(schema: DbSchema, table: string) {
    const select: Record<string, true> = {};

    const properties = schema.properties;

    const tableDef = properties[table];

    const tableDefProperties = tableDef.properties;

    const columnsDef = tableDefProperties.columns;

    const columnsDefProperties = columnsDef.properties;

    for (const column in columnsDefProperties) {
        if (column) {
            const columnDef = columnsDefProperties[column];

            const columnDefProperties = columnDef.properties;

            const selectableDef = columnDefProperties.selectable;

            const value = selectableDef.const;

            if (value === true) {
                select[column] = value;
            }
        }
    }

    return select;
}
