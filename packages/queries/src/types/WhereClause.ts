import { Table } from './Table';
import { Column } from './Column';
import { BinaryOp } from './BinaryOp';
import { ColumnValue } from './ColumnValue';
import { QueryParameter } from './QueryParameter';
import { RefOp } from './RefOp';

export type WhereClause<
    DB,
    TTable extends Table<DB>,
    TColumn extends Column<DB, TTable>,
> =
    | BinaryOp<DB, TTable, TColumn>
    | ColumnValue<DB, TTable, TColumn>
    | QueryParameter<ColumnValue<DB, TTable, TColumn>>
    | RefOp<DB>;
