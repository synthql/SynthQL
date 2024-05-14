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
 * 1. `{column: {operator: value}}` example: `{age: {'>': 18}}`, which translates to `age > 18`.
 * 2. `{column: value}` which is equivalent to `{column: {'=': value}}`.
 * 3. `{column: col('table.column')}` which translates to `column = table.column`.
 *
 */
export type Where<DB, TTable extends Table<DB>> = {
    [TColumn in Column<DB, TTable>]?: WhereClause<DB, TTable, TColumn>;
};
