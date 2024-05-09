import { Table } from './Table';

/**
 * The columns of a table.
 *
 * @param TTable The table the column belongs to.
 */

export type Column<DB, TTable extends Table<DB>> = DB[TTable] extends {
    columns: infer C;
}
    ? keyof C
    : never;
