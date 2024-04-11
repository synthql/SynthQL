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
    // Case 1: The value is a ColumnType
    DB[TTable][TColumn] extends Selectable<infer T>
        ? T
        : // Case 2: The value is a nullable ColumnType
          DB[TTable][TColumn] extends Selectable<infer T> | null
          ? T | null
          : DB[TTable][TColumn];

type Selectable<T> = {
    readonly __select__: T;
};
