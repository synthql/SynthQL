import { ColumnDef, TableDef } from '@synthql/queries';

export function getColumnDef<DB>(
    tableDef: TableDef<DB>,
    column: string,
): ColumnDef {
    return tableDef.properties.columns.properties[column];
}
