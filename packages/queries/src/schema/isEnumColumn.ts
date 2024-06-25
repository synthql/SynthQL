import { ColumnDef } from '../types/Schema';

export function isEnumColumn(columnDef: ColumnDef): boolean {
    if (columnDef.properties.type.enum) {
        return true;
    } else {
        return false;
    }
}
