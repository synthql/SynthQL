import { ColumnDef, TableDef } from '@synthql/queries';

export function getColumnNamesAndDefs<DB>(
    tableDef: TableDef<DB>,
): [string, ColumnDef][] {
    return Object.entries(tableDef.properties.columns.properties);
}
