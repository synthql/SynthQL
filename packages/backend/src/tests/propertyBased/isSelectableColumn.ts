import { ColumnDef } from '@synthql/queries';

export function isSelectableColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.selectable.const;
}
