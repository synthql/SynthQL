import {
    Schema,
    getColumnDef,
    getTableDef,
    isDateTimeColumn,
} from '@synthql/queries';

export function checkIfDateTimeColumn<DB>({
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

    return isDateTimeColumn(columnDef);
}
