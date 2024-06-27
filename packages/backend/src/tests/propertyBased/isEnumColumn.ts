import { ColumnDef } from '@synthql/queries';

export function isEnumColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.type.enum ? true : false;
}
