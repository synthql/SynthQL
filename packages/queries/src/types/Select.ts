import { Static, Type as t, TSchema } from '@sinclair/typebox';
import { Table } from './Table';
import { Column } from './Column';

export const SelectSchema = t.Record(t.String(), t.Optional(t.Boolean()));

/**
 * The type of a select clause in a query.
 */
export type Select<DB, TTable extends Table<DB>> =
    // Include only the specified columns
    {
        [TColumn in Column<DB, TTable>]?: true;
    };
