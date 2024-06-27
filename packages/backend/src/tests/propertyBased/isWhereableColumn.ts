import { ColumnDef } from '@synthql/queries';

export function isWhereableColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.whereable.const;
}
