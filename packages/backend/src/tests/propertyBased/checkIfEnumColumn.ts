import {
    Schema,
    getColumnDef,
    getTableDef,
    isEnumColumn,
} from '@synthql/queries';

export function checkIfEnumColumn<DB>({
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

    return isEnumColumn(columnDef);
}
