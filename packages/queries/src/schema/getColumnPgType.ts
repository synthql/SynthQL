import { ColumnDef } from '../types/Schema';

export function getColumnPgType(columnDef: ColumnDef): string {
    return columnDef.properties.type.id;
}
