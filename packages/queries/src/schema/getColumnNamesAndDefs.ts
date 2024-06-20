import { ColumnDef, TableDef } from '../types/Schema';

export function getColumnNamesAndDefs<DB>(
    tableDef: TableDef<DB>,
): [string, ColumnDef][] {
    return Object.entries(tableDef.properties.columns.properties);
}
