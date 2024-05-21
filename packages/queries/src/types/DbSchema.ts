export interface DbSchema {
    properties: Record<string, TableSchema>;
}

export interface TableSchema {
    properties: ColumnsSchema;
}

export interface ColumnsSchema {
    columns: {
        properties: Record<string, ColumnSchema>;
    };
}

export interface ColumnSchema {
    properties: {
        selectable: {
            type: string;
            const: boolean;
        };
    };
}
