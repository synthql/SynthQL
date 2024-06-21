import { ColumnDef } from '../types/Schema';

export function isTimestampzColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.type.format === 'date-time';
}
