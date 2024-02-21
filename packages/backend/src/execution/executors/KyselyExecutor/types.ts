import { JoinOp, Query } from '@synthql/queries';
import { BinaryOperator } from 'kysely';
import { AnyQuery } from '../../../types';


export interface AugmentedQuery {
    /**
     * A unique identifier for the query, inside the query tree.
     */
    id: string;

    /**
     * A reference to the query that was augmented
     */
    query: AnyQuery;

    depth: number;

    /**
     * The table that the query is selecting from
     */
    from: AugmentedTable;

    /**
     * The columns that the query is selecting.
     */
    select: Array<SelectionColumn | SelectionJsonbAgg>;

    /**
     * The where clause of the query.
     */
    where: Array<WhereOp>;

    children: AugmentedQuery[];

    join?: {
        type: 'left' | 'inner';
        joinTable: AugmentedTable;
        conditions: Array<{
            ownColumn: AugmentedColumn;
            otherColumn: AugmentedColumn;
            op: JoinOp;
        }>
    }
}

type WhereOp = WhereBinaryOp | WhereRefOp;

export type OpValue =
    | { type: 'column'; column: AugmentedColumn }
    | { type: 'value'; value: any };

export interface WhereBinaryOp {
    type: 'binary';
    lhs: OpValue;
    op: BinaryOperator;
    rhs: OpValue;
}

interface WhereRefOp {
    type: 'ref';
    lhs: AugmentedColumn;
    rhs: AugmentedColumn;
}

export interface SelectionColumn {
    type: 'column';
    column: string;
    /**
     * A unique identifier for the column, inside the query result.
     * Example:
     *
     * ```
     * select table.alias.column as id
     * from ...
     * ```
     */
    id: string;
    table: AugmentedTable;
}

export function isSelectionColumn(
    selection: SelectionColumn | SelectionJsonbAgg,
): selection is SelectionColumn {
    return selection.type === 'column';
}

export function isSelectionJsonbAgg(
    selection: SelectionColumn | SelectionJsonbAgg,
): selection is SelectionJsonbAgg {
    return selection.type === 'jsonb_agg';
}

interface SelectionJsonbAgg {
    type: 'jsonb_agg';
    id: string;
    table: AugmentedTable;
    columns: SelectionColumn[];
    includeColumn: string;
}

export interface AugmentedTable {
    alias: string;
    name: string;
    schema: string;
}

export interface AugmentedColumn {
    column: string;
    table: AugmentedTable;
}
