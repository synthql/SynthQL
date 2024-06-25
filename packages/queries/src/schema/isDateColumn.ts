import { ColumnDef } from '../types/Schema';

export function isDateColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.type.format === 'date';
}
