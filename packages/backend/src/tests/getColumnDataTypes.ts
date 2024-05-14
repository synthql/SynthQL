/**
 * Get the data types for the columns of a table
 *
 * Example:
 *
 * ```ts
 * type CustomerColumnDataTypes = ColumnTypes<DB['customer']['columns']>
 *
 * const customer: CustomerColumnDataTypes = {
 *   customer_id: 1;
 *   store_id: 3;
 *   first_name: 'First';
 *   last_name: 'Last';
 * }
 * ```
 */

export type ColumnDataTypes<Table> = {
    [TTable in keyof Table]: Table[TTable] extends {
        type: infer T;
    }
        ? T
        : never;
};
