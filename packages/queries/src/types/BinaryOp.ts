import { Table } from './Table';
import { Column } from './Column';
import { ColumnValue } from './ColumnValue';
import { QueryParameter } from './QueryParameter';
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
] as const;

/**
 * An SQL binary operator.
 */
export type BinaryOperator = (typeof BINARY_OPERATORS)[number];

/**
 * A typed binary operator, which can be used in a `Where` clause.
 *
 * Has the following format:
 *
 * ```ts
 * {
 *    [operator]: value
 * }
 * ```
 */
export type BinaryOp<
    DB,
    TTable extends Table<DB>,
    TColumn extends Column<DB, TTable>,
> = {
    [op in BinaryOperator | '= any']?:
        | ColumnValue<DB, TTable, TColumn>
        | Array<ColumnValue<DB, TTable, TColumn>>
        | QueryParameter<ColumnValue<DB, TTable, TColumn>>
        | RefOp<DB>;
};
