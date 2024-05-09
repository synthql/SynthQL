/**
 * A column reference is a string that represents a column in a table.
 *
 * It is a string that is in the format `${table}.${column}`.
 *
 * Example: `users.id`
 */

export type ColumnReference<DB> = {
    [TTable in keyof DB]: DB[TTable] extends object
        ? `${TTable & string}.${DB[TTable] extends {
              columns: infer C;
          }
              ? keyof C
              : string}`
        : never;
}[keyof DB];
