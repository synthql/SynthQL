import { ColumnDef } from '../types/Schema';

export function isSelectableColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.selectable.const;
}
