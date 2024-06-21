import {
    Schema,
    getColumnDef,
    getTableDef,
    isTimestampzColumn,
} from '@synthql/queries';

export function checkIfTimestampzColumn<DB>({
    schema,
    table,
    column,
}: {
    schema: Schema<DB>;
    table: string;
    column: string;
}): boolean {
    const tableDef = getTableDef(schema, table);

    const columnDef = getColumnDef(tableDef, column);

    return isTimestampzColumn(columnDef);
}
