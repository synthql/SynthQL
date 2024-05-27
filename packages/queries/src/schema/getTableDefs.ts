import { ColumnSchema, DbSchema, TableSchema } from '../types/DbSchema';
import { Table } from '../types/Table';

export function getTableDef<DB>(
    schema: DbSchema<DB>,
    table: Table<DB>,
): TableSchema<DB> {
    return schema.properties[table];
}

export function getColumnDefs<DB>(
    tableDef: TableSchema<DB>,
): [string, ColumnSchema][] {
    return Object.entries(tableDef.properties.columns.properties);
}

export function isSelectableColumn(columnDef: ColumnSchema): boolean {
    return columnDef.properties.selectable.const;
}

export function isPrimaryKeyColumn(columnDef: ColumnSchema): boolean {
    return columnDef.properties.isPrimaryKey.const;
}
