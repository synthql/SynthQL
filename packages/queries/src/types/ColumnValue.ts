import { Table } from './Table';
import { Column } from './Column';

/**
 * Get the data type of a column in the database.
 *
 * Example:
 *
 * ```ts
 * type ColumnValueType = ColumnValue<DB, 'customer', 'email'>;
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

/**
 * Get the data type of a column in the database by passing the `columns` type object.
 *
 * Example:
 *
 * ```ts
 * type ColumnType = ColumnValue<DB['customer']['columns'], 'email'>;
 *
 * const email: ColumnType = 'name@example.com';
 * ```
 *
 * @param TColumnDef The columns of the table.
 * @param TColumn The name of the column that you want its data type.
 */

export type ColumnType<
    TColumnDef,
    TColumn extends keyof TColumnDef,
> = TColumnDef[TColumn] extends { type: infer TNullableType; nullable: true }
    ? TNullableType | null
    : TColumnDef[TColumn] extends {
            type: infer TNotNullableType;
            nullable: false;
        }
      ? TNotNullableType
      : never;
