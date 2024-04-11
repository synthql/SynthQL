import { Table } from './Table';
import { Query } from './types';

export type Include<DB> = {
    [k in string]: Query<DB, Table<DB>> extends Query<DB, infer TTable>
        ? Query<DB, TTable>
        : never;
};
