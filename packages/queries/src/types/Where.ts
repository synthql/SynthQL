import { Table } from './Table';
import { Column } from './Column';
import { WhereClause } from './WhereClause';

/**
 * A where clause in a query.
 *
 * This is currently provides _very_ basic support for filtering.
 *
 * Currently, this can be either:
 *
 * 1. `{column: {operator: value}}`, example: `{age: {'>': 18}}`,
 * which translates to ` WHERE age > 18`.
 *
 * 1. `{column: value}`, example: `{age: 18}`, which is
 * equivalent to `{age: {'=': 18}}` and translates to `WHERE age = 18`.
 *
 * 1. `{column: col('table.column')}`, example: `{age: col('users.bio')}`,
 * which translates to `WHERE age = users.bio`.
 *
 * 1. `{column: param(value)}`, example: `{age: param(18)}`,
 * which also translates to `WHERE age = ?`, and adds some metadata
 * that 'marks' your query to be processed as a persisted query
 * (after registering it via `QueryEngine.registerQueries()`),
 * for even faster query execution.
 */
export type Where<DB, TTable extends Table<DB>> = {
    [TColumn in Column<DB, TTable>]?: WhereClause<DB, TTable, TColumn>;
};
