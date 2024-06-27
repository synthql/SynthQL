import { ColumnDef } from '@synthql/queries';

export function getColumnEnumConstants(
    columnDef: ColumnDef,
): readonly string[] | undefined {
    return columnDef.properties.type.enum;
}
