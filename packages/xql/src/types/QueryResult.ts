import { Column, ColumnValue, Query, Table } from './Query';

export type QueryResult<DB, T> = T extends Query<DB, infer TTable>
    ? QueryResultInner<DB, TTable, T>
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

export type SelectedColumns<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = TQuery['select'] extends true
    // Select all columns
    ? Column<DB, TTable>
    // Select only the specified columns
    : Column<DB, TTable> & keyof TQuery['select'];

export type IncludedColumns<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = keyof TQuery['include'];

type QueryResultFromInclude<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
> = {
        [TCol in IncludedColumns<DB, TTable, TQuery>]: // Case 1: The query is lazy.
        TQuery['include'][TCol] extends { lazy: true }
        ? LazyQueryResult<DB, TQuery['include'][TCol]>
        : // Case 2: The query is eager, with a cardinality of "maybe".
        TQuery['include'][TCol] extends { cardinality: 'maybe' }
        ? MaybeQueryResult<DB, TQuery['include'][TCol]>
        : // Case 3: The query is eager, with a cardinality of "one".
        TQuery['include'][TCol] extends { cardinality: 'one' }
        ? QueryResult<DB, TQuery['include'][TCol]>
        : // Case 4: The query is eager, with a cardinality of "many".
        ManyQueryResult<DB, TQuery['include'][TCol]>;
    };

type LazyQueryResult<DB, TQuery> =
    | { status: 'pending' }
    | { status: 'done'; data: QueryResult<DB, TQuery> }
    | { status: 'error'; error: any };

type MaybeQueryResult<DB, TQuery> = null | QueryResult<DB, TQuery>;

type ManyQueryResult<DB, TQuery> = QueryResult<DB, TQuery>[];
