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
        [x: string]: {
            id?: string;
            type: string;
            description: string;
            properties?: ColumnDefs<DB>;
            required?: string[];
            format?: string;
            additionalProperties?: boolean;
            title?: string;
            tsType?: string;
            minimum?: unknown;
            maximum?: unknown;
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
    properties: {
        type: ColumnDefTypeDef;
        selectable: ColumnDefAttributeDef;
        includable: ColumnDefAttributeDef;
        whereable: ColumnDefAttributeDef;
        nullable: ColumnDefAttributeDef;
        isPrimaryKey: ColumnDefAttributeDef;
    };
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
    title?: string;
    type: string;
    tsType?: string;
    description: string;
    minimum?: unknown;
    maximum?: unknown;
    format?: string;
    enum?: readonly string[];
}

interface ColumnDefAttributeDef {
    type: string;
    const: boolean;
}

export interface SchemaDefOverrides {
    [x: string]: TableDefOverrides | undefined;
}
export interface TableDefOverrides {
    [x: string]: Partial<ColumnDefProperties> | undefined;
}
