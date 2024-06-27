import { TableDef } from '@synthql/queries';

export function getColumnNames<DB>(tableDef: TableDef<DB>): string[] {
    return Object.keys(tableDef.properties.columns.properties);
}
