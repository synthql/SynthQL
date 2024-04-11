import { Table } from './Table';

/**
 * The name of a column in the database.
 *
 * @param TTable The table the column belongs to.
 */

export type Column<DB, TTable extends Table<DB>> = keyof DB[TTable] & string;
