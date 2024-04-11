import { Table } from './Table';
import { Column } from './Column';
import { ColumnValue } from './ColumnValue';
import { RefOp } from './RefOp';

export const BINARY_OPERATORS = [
    '=',
    '==',
    '!=',
    '<>',
    '>',
    '>=',
    '<',
    '<=',
    'in',
    'not in',
    'is',
    'is not',
    'like',
    'not like',
    'match',
    'ilike',
    'not ilike',
    '@>',
    '<@',
    '&&',
    '?',
    '?&',
    '!<',
    '!>',
    '<=>',
    '!~',
    '~',
    '~*',
    '!~*',
    '@@',
    '@@@',
    '!!',
    '<->',
    'regexp',
    '+',
    '-',
    '*',
    '/',
    '%',
    '^',
    '&',
    '|',
    '#',
    '<<',
    '>>',
    '&&',
    '||',
];

type BinaryOperator = (typeof BINARY_OPERATORS)[number];

/**
 * An SQL binary operator.
 */
export type BinaryOp<
    DB,
    TTable extends Table<DB>,
    TColumn extends Column<DB, TTable>,
> = {
    [op in BinaryOperator | '= any']?:
        | ColumnValue<DB, TTable, TColumn>
        | Array<ColumnValue<DB, TTable, TColumn>>
        | RefOp<DB>;
};
