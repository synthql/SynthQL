/**
 * A column reference is a string that represents a column in a table.
 *
 * It is a string that is in the format `${table}.${column}`.
 *
 * Example: `users.id`
 */

import { Column } from './Column';
import { Table } from './Table';

type AllRefs<DB> = { [table in Table<DB>]: `${table}.${Column<DB, table>}` };

export type ColumnReference<DB> = AllRefs<DB>[keyof AllRefs<DB>];
