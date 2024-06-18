import { Column } from '../types/Column';
import {
    AnyColumnDef,
    AnySchema,
    AnyTableDef,
    ColumnDef,
    Schema,
    TableDef,
} from '../types/Schema';
import { Table } from '../types/Table';

export function getTableNamesFromGenericDbSchema(schema: AnySchema): string[] {
    return Object.keys(schema.properties);
}

export function getTableNames<DB>(schema: Schema<DB>): string[] {
    return Object.keys(schema.properties);
}

export function getTableDefFromGenericDbSchema(
    schema: AnySchema,
    table: string,
): AnyTableDef {
    return schema.properties[table];
}

export function getTableDef<DB>(
    schema: Schema<DB>,
    table: Table<DB>,
): TableDef<DB> {
    return schema.properties[table];
}

export function getTableDefsFromGenericDbSchema(
    schema: AnySchema,
): AnyTableDef[] {
    return Object.values(schema.properties);
}

export function getTableDefs<DB>(schema: Schema<DB>): TableDef<DB>[] {
    return Object.values(schema.properties);
}

export function getTableNamesAndDefsFromGenericDbSchema(
    schema: AnySchema,
): [string, AnyTableDef][] {
    return Object.entries(schema.properties);
}

export function getTableNamesAndDefs<DB>(
    schema: Schema<DB>,
): [string, TableDef<DB>][] {
    return Object.entries(schema.properties);
}

export function getColumnNamesFromGenericTableDef(
    tableDef: AnyTableDef,
): string[] {
    return Object.keys(tableDef.properties.columns.properties);
}

export function getColumnNames<DB>(tableDef: TableDef<DB>): string[] {
    return Object.keys(tableDef.properties.columns.properties);
}

export function getColumnDef<DB>(
    tableDef: TableDef<DB>,
    column: Column<DB, Table<DB>>,
): ColumnDef {
    return tableDef.properties.columns.properties[column];
}

export function getColumnDefs<DB>(tableDef: TableDef<DB>): ColumnDef[] {
    return Object.values(tableDef.properties.columns.properties);
}

export function getColumnNamesAndDefs<DB>(
    tableDef: TableDef<DB>,
): [string, ColumnDef][] {
    return Object.entries(tableDef.properties.columns.properties);
}

export function getColumnNamesAndDefsFromGenericTableDef(
    tableDef: AnyTableDef,
): [string, AnyColumnDef][] {
    return Object.entries(tableDef.properties.columns.properties);
}

export function isSelectableColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.selectable.const;
}

export function isSelectableColumnFromGenericColumnDef(
    columnDef: AnyColumnDef,
): boolean {
    return columnDef.properties.selectable.const;
}

export function isPrimaryKeyColumn(columnDef: ColumnDef): boolean {
    return columnDef.properties.isPrimaryKey.const;
}

export function isWhereableColumnFromGenericColumnDef(
    columnDef: AnyColumnDef,
): boolean {
    return columnDef.properties.whereable.const;
}
