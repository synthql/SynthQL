import { Column } from './Column';
import { Table } from './Table';

export interface Schema<DB, TTable extends Table<DB> = Table<DB>> {
    $schema: string;
    type: string;
    description: string;
    properties: Record<TTable | string, TableDef<DB>>;
    required: string[];
    additionalProperties: boolean;
    $defs: {
        [key: string]: {
            id?: string;
            type: string;
            description: string;
            properties?: ColumnDefs<DB>;
            required?: string[];
            format?: string;
            additionalProperties?: boolean;
            title?: string;
            tsType?: string;
            minimum?: number;
            maximum?: number;
            enum?: readonly string[];
        };
    };
}

export interface TableDef<DB> {
    type: string;
    description: string;
    properties: ColumnDefs<DB>;
    required: string[];
    additionalProperties: boolean;
}

export interface ColumnDefs<DB, TTable extends Table<DB> = Table<DB>> {
    columns: {
        type: string;
        properties: Record<Column<DB, TTable> | string, ColumnDef>;
        required: string[];
        additionalProperties: boolean;
    };
}

export interface ColumnDef {
    type: string;
    description: string;
    properties: ColumnDefProperties;
    required: string[];
    additionalProperties: boolean;
}

export interface ColumnDefProperties {
    type: ColumnDefTypeDef;
    selectable: ColumnDefAttributeDef;
    includable: ColumnDefAttributeDef;
    whereable: ColumnDefAttributeDef;
    nullable: ColumnDefAttributeDef;
    isPrimaryKey: ColumnDefAttributeDef;
}

interface ColumnDefTypeDef {
    id: string;
    description: string;
    type: string;
    title?: string;
    tsType?: string;
    minimum?: number;
    maximum?: number;
    format?: string;
    enum?: readonly string[];
    properties?: Record<string, ColumnDefPropertyDef>;
}

interface ColumnDefPropertyDef {
    type: string;
    id?: string;
    description?: string;
    title?: string;
    tsType?: string;
    minimum?: number;
    maximum?: number;
    format?: string;
    enum?: readonly string[];
}

interface ColumnDefAttributeDef {
    type: string;
    const: boolean;
}
