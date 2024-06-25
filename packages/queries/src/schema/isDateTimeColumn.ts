import { ColumnDef } from '../types/Schema';

export function isDateTimeColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.type.format === 'date-time';
}
