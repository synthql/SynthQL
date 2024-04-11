import { Table } from './Table';
import { Column } from './Column';
import { ColumnValue } from './ColumnValue';
import { RefOp } from './RefOp';
import { BinaryOp } from './BinaryOp';

export type WhereClause<
    DB,
    TTable extends Table<DB>,
    TColumn extends Column<DB, TTable>,
> =
    | ColumnValue<DB, TTable, TColumn>
    | BinaryOp<DB, TTable, TColumn>
    | RefOp<DB>;
