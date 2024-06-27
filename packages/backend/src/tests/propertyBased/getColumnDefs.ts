import { ColumnDef, TableDef } from '@synthql/queries';

export function getColumnDefs<DB>(tableDef: TableDef<DB>): ColumnDef[] {
    return Object.values(tableDef.properties.columns.properties);
}
