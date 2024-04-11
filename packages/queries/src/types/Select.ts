import { Table } from './Table';
import { Column } from './Column';

/**
 * The type of a select clause in a query.
 */
export type Select<DB, TTable extends Table<DB>> =
    // Include only the specified columns
    {
        [TColumn in Column<DB, TTable>]?: true;
    };
