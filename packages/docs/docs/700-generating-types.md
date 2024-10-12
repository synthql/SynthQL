# Generating types

SynthQL comes with a CLI tool for generating types from your database. These types are used to guarantee end to end type safety when building queries.

To generate types from your database, run the following command:

```bash
npx @synthql/cli generate \

    # A list of schemas to include, separated by spaces
    --schemas public types \

    # A list of tables to include, separated by spaces
    --tables table1 table2 \

    # The connection string to your database
    # e.g. postgres://username:password@host:port/database
    --url DATABASE_URL \

    # The default schema to use when no schema is specified in a query
    --defaultSchema luminovo
```

You can also get help by running `npx @synthql/cli generate --help`.

## synthql.config.json

You can also generate types from a configuration file by running

```bash
npx @synthql/cli generate --configFile ./synthql.config.json --url DATABASE_URL
```

Here's an example configuration file:

```ts
// at ./synthql.config.json
{
    "$schema": "https://synthql.dev/schemas/synthql.config.json",
    "schemas": ["public"],
    "tables": ["table1", "table2"],
    "defaultSchema": "luminovo"
}
```
