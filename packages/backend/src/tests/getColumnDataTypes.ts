/**
 * Get the data types for the columns of a table
 *
 * Example:
 *
 * ```ts
 * type CustomerColumnDataTypes = ColumnDataTypes<DB['customer']['columns']>;
 *
 * const customer: CustomerColumnDataTypes = {
 *   customer_id: 1;
 *   store_id: 3;
 *   first_name: 'First';
 *   last_name: 'Last';
 * };
 * ```
 */

export type ColumnDataTypes<TColumnDef> = {
    [TTable in keyof TColumnDef]: TColumnDef[TTable] extends {
        type: infer T;
        nullable: true;
    }
        ? T | null
        : TColumnDef[TTable] extends {
                type: infer T;
                nullable: false;
            }
          ? T
          : never;
};
