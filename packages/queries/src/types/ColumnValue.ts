import { Type as t } from '@sinclair/typebox';
import { Column } from './Column';
import { Table } from './Table';

const PrimitiveSchema = t.Union([
    t.String(),
    t.Number(),
    t.Boolean(),
    t.Null(),
    t.Undefined(),
    t.BigInt(),
    t.Date(),
]);

export const ColumnValueSchema = t.Union([
    PrimitiveSchema,
    t.Array(PrimitiveSchema),
]);

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

export type ColumnType<TColumnDef, TColumn extends keyof TColumnDef> =
    // Case 1: Check if nullable is false
    TColumnDef[TColumn] extends {
        type: infer TNotNullableType;
        nullable: false;
    }
        ? TNotNullableType
        : // Case 2: Check if nullable is boolean
          TColumnDef[TColumn] extends {
                type: infer TNullableType;
                nullable: boolean;
            }
          ? TNullableType | null
          : // Case 3: Return never if nullable is not boolean
            never;
