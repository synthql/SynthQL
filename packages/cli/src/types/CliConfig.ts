import { ColumnDefProperties } from '@synthql/queries';
export interface CliConfig {
    /**
     * Internal. DO NOT USE/SET this option.
     *
     * Specifies which draft of the JSON Schema
     * standard the schema adheres to.
     */
    $schema?: string;
    /**
     * The output directory for the generated files.
     * e.g. `src/generated`.
     */
    out: string;
    /**
     * The default schema to use.
     * e.g. `public`.
     * This is similar to the `search_path` in PostgreSQL.
     */
    defaultSchema: string;
    /**
     * The schemas to include in generation.
     * e.g. `['public']`.
     */
    schemas: Array<string>;
    /**
     * The tables and/or views to include in generation.
     * e.g. `['users', 'accounts', 'user_account']`.
     */
    tablesAndViews?: Array<string>;
    /**
     * The table definitions for any tables you want
     * to be overriden during the schema generation.
     *
     * The key for each table should be the qualified name for the table,
     * in the form `${schemaName}.${tableName}`.
     * e.g. `public.users`.
     *
     * The key for each column should be the name of the column,
     * in the form `${columnName}`.
     * e.g `first_name`.
     */
    schemaDefOverrides?: SchemaDefOverrides;
}
export interface SchemaDefOverrides {
    /**
     * The column definitions for each table/view to be overriden.
     * The key for each table/view should be the qualified name for
     * the table/view, in the form `${schemaName}.${tableOrViewName}`.
     * e.g. `public.users`, `public.user_account`.
     */
    [tableOrView: string]: {
        /**
         * The attribute definitions for each column to be overriden.
         * The key for each column should be the name of the column,
         * in the form `${columnName}`.
         * e.g `first_name`.
         */
        [column: string]: Partial<ColumnDefProperties>;
    };
}
