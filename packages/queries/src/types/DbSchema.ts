import { Column } from './Column';
import { Table } from './Table';

export interface AnyDbSchema {
    properties: Record<string, AnyTableDef>;
}

export interface DbSchema<DB> {
    properties: Record<Table<DB>, TableDef<DB>>;
}

export interface AnyTableDef {
    properties: AnyColumnDefs;
}

export interface TableDef<DB> {
    properties: ColumnDefs<DB>;
}

export interface AnyColumnDefs {
    columns: {
        properties: Record<string, AnyColumnDef>;
    };
}

export interface ColumnDefs<DB> {
    columns: {
        properties: Record<Column<DB, Table<DB>>, ColumnDef>;
    };
}

export interface AnyColumnDef {
    properties: {
        type: {
            type: string;
        };
        selectable: {
            type: string;
            const: boolean;
        };
        whereable: {
            type: string;
            const: boolean;
        };
        isPrimaryKey: {
            type: string;
            const: boolean;
        };
    };
}

export interface ColumnDef {
    properties: {
        type: {
            type: string;
        };
        selectable: {
            type: string;
            const: boolean;
        };
        whereable: {
            type: string;
            const: boolean;
        };
        isPrimaryKey: {
            type: string;
            const: boolean;
        };
    };
}
