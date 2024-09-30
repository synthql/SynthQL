import { Type as t } from '@sinclair/typebox';
import { BinaryOp, BinaryOpSchema } from './BinaryOp';
import { Column } from './Column';
import { ColumnValue, ColumnValueSchema } from './ColumnValue';
import { RefOp, RefOpSchema } from './RefOp';
import { Table } from './Table';

export const WhereClauseSchema = t.Union([
    ColumnValueSchema,
    BinaryOpSchema,
    RefOpSchema,
]);

export type WhereClause<
    DB,
    TTable extends Table<DB>,
    TColumn extends Column<DB, TTable>,
> =
    | ColumnValue<DB, TTable, TColumn>
    | BinaryOp<DB, TTable, TColumn>
    | RefOp<DB>;
