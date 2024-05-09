import { Table } from './Table';

/**
 * The names of the columns of a table, returned as a string union type.
 *
 * Example:
 *
 * ```ts
 * type ColumnNamesType = Column<DB, 'customer'>;
 *
 * const customer: ColumnNamesType = 'customer_id' | 'store_id' | 'first_name' | 'last_name';
 * ```
 * @param TTable The table the column belongs to.
 */

export type Column<DB, TTable extends Table<DB>> = DB[TTable] extends {
    columns: infer TColumnDef;
}
    ? keyof TColumnDef
    : never;
