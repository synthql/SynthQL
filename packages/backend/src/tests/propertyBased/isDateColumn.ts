import { ColumnDef } from '@synthql/queries';

export function isDateColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.type.format === 'date';
}
