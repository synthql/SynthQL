import { ColumnDef, TableDef } from '../types/Schema';

export function getColumnDefs<DB>(tableDef: TableDef<DB>): ColumnDef[] {
    return Object.values(tableDef.properties.columns.properties);
}
