import type { BinaryOperator } from 'kysely';

/**
 * The name of a table in the database.
 */
export type Table<DB> = keyof DB & string;

/**
 * The name of a column in the database.
 *
 * @param TTable The table the column belongs to.
 */
export type Column<DB, TTable extends Table<DB>> = keyof DB[TTable] & string;

export type ColumnReference<DB> = {
    [TTable in keyof DB]: DB[TTable] extends object
    ? `${TTable & string}.${(keyof DB[TTable] & string) | '*'}`
    : never;
}[keyof DB];

/**
 * The value of a column in the database.
 *
 * Our schemas are not null-strict, so every column can be null.
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
    : // Else: just get the type of the column
    DB[TTable][TColumn];

type Selectable<T> = {
    readonly __select__: T;
};

/**
 * A binary operator.
 */
type BinaryOp<
    DB,
    TTable extends Table<DB>,
    TColumn extends Column<DB, TTable>,
> = {
        [op in BinaryOperator]?:
        | ColumnValue<DB, TTable, TColumn>
        | Array<ColumnValue<DB, TTable, TColumn>>
        | RefOp<DB>;
    };

export type JoinOp = '=' | '= any';

export type RefOp<DB> = {
    $ref: {
        table: Table<DB>;
        column: string;
        op?: JoinOp;
    };
};
export function isRefOp(op: any): op is RefOp<any> {
    if (op === undefined || op === null) {
        return false;
    }
    if (typeof op !== 'object') {
        return false;
    }
    if (!('$ref' in op)) {
        return false;
    }
    if (typeof op.$ref !== 'object') {
        return false;
    }
    if (op.$ref.table === undefined || op.$ref.column === undefined) {
        return false;
    }
    return true;
}

export type WhereClause<
    DB,
    TTable extends Table<DB>,
    TColumn extends Column<DB, TTable>,
> =
    | ColumnValue<DB, TTable, TColumn>
    | BinaryOp<DB, TTable, TColumn>
    | RefOp<DB>;

export type Where<DB, TTable extends Table<DB>> = {
    [TColumn in Column<DB, TTable>]?: WhereClause<DB, TTable, TColumn>;
};

export type Select<DB, TTable extends Table<DB>> =
    // Include only the specified columns
    | { [TColumn in Column<DB, TTable>]?: true }

export type Include<DB> = {
    [k in string]: Query<DB, Table<DB>> extends Query<DB, infer TTable>
    ? Query<DB, TTable>
    : never;
};

export type Query<DB, TTable extends Table<DB>> = {
    from: TTable;
    where: Where<DB, TTable>;
    select: Select<DB, TTable>;
    include?: Include<DB>;
    limit?: number;
    cardinality?: 'one' | 'maybe' | 'many';
    lazy?: true;
    groupingId?: string;
};
