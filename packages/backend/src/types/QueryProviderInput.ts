import { ColumnValue, Table } from '@synthql/queries';

/**
 * Get all the `whereable` columns in a table and return
 * them in the shape of the input to the QueryProvider.
 *
 * Example:
 *
 * ```ts
 * type QueryProviderInputType = QueryProviderInput<DB, 'actor'>;
 *
 * const actor: QueryProviderInputType = {
 *     actor_id: [1];
 *     first_name: ['John'];
 *     last_name: ['Doe'];
 *     last_update: ['2022-02-15T09:34:33.000Z'];
 * };
 * ```
 *
 * @param TTable The table the column belongs to.
 */

export type QueryProviderInput<
    DB,
    TTable extends Table<DB>,
> = RemoveNeverValues<{
    [k in DB[TTable] extends { columns: infer TColumnDef }
        ? keyof TColumnDef
        : never]: DB[TTable] extends { columns: infer TColumnDef }
        ? TColumnDef[k] extends { whereable: true }
            ? ColumnValue<DB, TTable, k>[] | undefined
            : never
        : never;
}>;

type RemoveNeverValues<T> = {
    [K in keyof T as T[K] extends never ? never : K]: T[K];
};
