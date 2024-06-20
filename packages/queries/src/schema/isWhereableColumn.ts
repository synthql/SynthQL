import { ColumnDef } from '../types/Schema';

export function isWhereableColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.whereable.const;
}
