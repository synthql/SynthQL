import {
    Schema,
    getColumnDef,
    getTableDef,
    isDateColumn,
} from '@synthql/queries';

export function checkIfDateColumn<DB>({
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

    return isDateColumn(columnDef);
}
