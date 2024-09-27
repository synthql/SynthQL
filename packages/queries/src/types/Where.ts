import { Type as t } from '@sinclair/typebox';
import { Column } from './Column';
import { Table } from './Table';
import { WhereClause, WhereClauseSchema } from './WhereClause';

export const WhereSchema = t.Record(t.String(), WhereClauseSchema);

/**
 * A where clause in a query.
 *
 * This is currently provides _very_ basic support for filtering.
 *
 * Currently, this can be either:
 *
 * 1. `{column: {operator: value}}` example: `{age: {'>': 18}}`, which translates to `age > 18`.
 * 1. `{column: value}` which is equivalent to `{column: {'=': value}}`.
 * 1. `{column: col('table.column')}` which translates to `column = table.column`.
 *
 */
export type Where<DB, TTable extends Table<DB>> = {
    [TColumn in Column<DB, TTable>]?: WhereClause<DB, TTable, TColumn>;
};
