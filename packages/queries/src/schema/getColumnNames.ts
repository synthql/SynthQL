import { TableDef } from '../types/Schema';

export function getColumnNames<DB>(tableDef: TableDef<DB>): string[] {
    return Object.keys(tableDef.properties.columns.properties);
}
