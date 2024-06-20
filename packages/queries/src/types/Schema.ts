import { Column } from './Column';
import { Table } from './Table';

export interface Schema<DB, TTable extends Table<DB> = Table<DB>> {
    properties: Record<TTable | string, TableDef<DB>>;
}

export interface TableDef<DB> {
    properties: ColumnDefs<DB>;
}

export interface ColumnDefs<DB, TTable extends Table<DB> = Table<DB>> {
    columns: {
        properties: Record<Column<DB, TTable> | string, ColumnDef>;
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
