import { ColumnDef } from '../types/Schema';

export function isEnumColumn(columnDef: ColumnDef): boolean {
    if (columnDef.properties.type.enum) {
        return columnDef.properties.type.enum.length > 0;
    } else {
        return false;
    }
}
