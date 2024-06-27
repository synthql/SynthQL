import { ColumnDef } from '@synthql/queries';

export function getColumnPgType(columnDef: ColumnDef): string {
    return columnDef.properties.type.id;
}
