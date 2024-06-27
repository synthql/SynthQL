import { ColumnDef } from '../types/Schema';

export function isPrimaryKeyColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.isPrimaryKey.const;
}
