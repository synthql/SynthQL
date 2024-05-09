import { Table } from './Table';
import { Column } from './Column';

/**
 * The type of a column in the database.
 *
 * Example: `ColumnValue<DB, 'users', 'age'> = number`
 *
 * @param TTable The table the column belongs to.
 * @param TColumn The column the value belongs to.
 */

export type ColumnValue<
    DB,
    TTable extends Table<DB>,
    TColumn extends Column<DB, TTable>,
> =
    // Get to the col
    DB[TTable] extends { columns: infer TColumnDef }
    ? ColumnType<TColumnDef, TColumn>
    : never;


type ColumnType<TColumnDef, TColumn extends keyof TColumnDef> =
    TColumnDef[TColumn] extends { type: infer TType }
    ? TType
    : never;

