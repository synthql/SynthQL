import { ColumnValue } from './ColumnValue';
import { Table } from './Table';

export type QueryProviderInput<
    DB,
    TTable extends Table<DB>,
> = RemoveNeverValues<{
    [k in DB[TTable] extends { columns: infer TColumnDef }
        ? keyof TColumnDef
        : never]: DB[TTable] extends { columns: infer TColumnDef }
        ? TColumnDef[k] extends { whereable: true }
            ? ColumnValue<DB, TTable, k>[]
            : never
        : never;
}>;

type RemoveNeverValues<T> = {
    [K in keyof T as T[K] extends never ? never : K]: T[K];
};
