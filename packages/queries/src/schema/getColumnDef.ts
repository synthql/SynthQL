import { ColumnDef, TableDef } from '../types/Schema';

export function getColumnDef<DB>(
    tableDef: TableDef<DB>,
    column: string,
): ColumnDef {
    return tableDef.properties.columns.properties[column];
}
