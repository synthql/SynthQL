import { Column, ColumnValue, Query, Table } from './Query';

export type QueryResult<DB, TQuery> = TQuery extends Query<DB, infer TTable>
    ? ApplyCardinality<DB, TTable, TQuery>
    : never;

type QueryResultInner<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = QueryResultFromSelect<DB, TTable, TQuery> &
    QueryResultFromInclude<DB, TTable, TQuery>;

type QueryResultFromSelect<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = {
    [TCol in SelectedColumns<DB, TTable, TQuery>]: ColumnValue<
        DB,
        TTable,
        TCol
    >;
};

type SelectedColumns<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = TQuery['select'] extends true
    ? // Select all columns
      Column<DB, TTable>
    : // Select only the specified columns
      Column<DB, TTable> & keyof TQuery['select'];

type IncludedColumns<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = keyof TQuery['include'];

type QueryResultFromInclude<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = {
    [TCol in IncludedColumns<DB, TTable, TQuery>]: QueryResult<
        DB,
        TQuery['include'][TCol]
    >;
};

type LazyQueryResult<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> =
    | { status: 'pending' }
    | { status: 'done'; data: QueryResult<DB, TQuery> }
    | { status: 'error'; error: any };

type MaybeQueryResult<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = null | QueryResultInner<DB, TTable, TQuery>;

type ManyQueryResult<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = QueryResultInner<DB, TTable, TQuery>[];

type ApplyCardinality<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> =
    // Case 1: lazy query
    TQuery extends { lazy: true }
        ? LazyQueryResult<DB, TTable, TQuery>
        : // Case 2: many
          TQuery extends { cardinality: 'many' }
          ? ManyQueryResult<DB, TTable, TQuery>
          : // Case 2: one
            TQuery extends { cardinality: 'one' }
            ? QueryResultInner<DB, TTable, TQuery>
            : // Case 2: maybe
              TQuery extends { cardinality: 'maybe' }
              ? MaybeQueryResult<DB, TTable, TQuery>
              : // Else
                never;
