import { ColumnDef } from '../types/Schema';

export function getColumnEnumConstants(
    columnDef: ColumnDef,
): readonly string[] | undefined {
    return columnDef.properties.type.enum;
}
