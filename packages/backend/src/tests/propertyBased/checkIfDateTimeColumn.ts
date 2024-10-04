import { Schema, Table } from '@synthql/queries';
import { getTableDef } from './getTableDef';
import { getColumnDef } from './getColumnDef';
import { isDateTimeColumn } from './isDateTimeColumn';

export function checkIfDateTimeColumn<DB>({
    schema,
    table,
    column,
}: {
    schema: Schema<DB>;
    table: Table<DB>;
    column: string;
}): boolean {
    const tableDef = getTableDef(schema, table);

    const columnDef = getColumnDef(tableDef, column);

    return isDateTimeColumn(columnDef);
}
