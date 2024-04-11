/**
 * The name of a table in the database.
 */
export type Table<DB> = keyof DB & string;
