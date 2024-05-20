export interface DbSchema {
    properties: Record<string, TableSchema>;
}

interface TableSchema {
    properties: ColumnsSchema;
}

interface ColumnsSchema {
    columns: {
        properties: Record<string, ColumnSchema>;
    };
}

interface ColumnSchema {
    properties: {
        selectable: {
            type: string;
            const: boolean;
        };
    };
}
