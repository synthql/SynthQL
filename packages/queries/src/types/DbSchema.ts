import { Column } from './Column';
import { Table } from './Table';

export interface DbSchema<DB> {
    properties: Record<Table<DB>, TableSchema<DB>>;
}

export interface TableSchema<DB> {
    properties: ColumnsSchema<DB>;
}

export interface ColumnsSchema<DB> {
    columns: {
        properties: Record<Column<DB, Table<DB>>, ColumnSchema>;
    };
}

export interface ColumnSchema {
    properties: {
        selectable: {
            type: string;
            const: boolean;
        };
        isPrimaryKey: {
            type: string;
            const: boolean;
        };
    };
}
