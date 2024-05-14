import { Table } from './Table';
import { Column } from './Column';

/**
 * Get the data type of a column in the database.
 *
 * Example:
 *
 * ```ts
 * type ColumnValueType = ColumnValue<DB, 'customer', 'email'>
 *
 * const email: ColumnValueType = 'name@example.com';
 * ```
 *
 * @param TTable The table the column belongs to.
 * @param TColumn The name of the column.
 */

export type ColumnValue<
    DB,
    TTable extends Table<DB>,
    TColumn extends Column<DB, TTable>,
> = DB[TTable] extends { columns: infer TColumnDef }
    ? ColumnType<TColumnDef, TColumn>
    : never;

type ColumnType<
    TColumnDef,
    TColumn extends keyof TColumnDef,
> = TColumnDef[TColumn] extends
    | { type: infer TNullableType; nullable: true }
    | undefined
    ? TNullableType | null
    : TColumnDef[TColumn] extends {
            type: infer TNotNullableType;
            nullable: false;
        }
      ? TNotNullableType
      : never;
