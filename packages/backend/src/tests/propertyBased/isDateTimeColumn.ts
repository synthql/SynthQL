import { ColumnDef } from '@synthql/queries';

export function isDateTimeColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.type.format === 'date-time';
}
