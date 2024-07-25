# @synthql/cli

The SynthQL CLI.

## Generate types from your Postgres database

To generate types from your Postgres database schema, use the `generate` command.

```sh
synthql generate \
    # The Postgres database connection string
    # Option alias: `--url`
    --connectionString=postgres://postgres:postgres@localhost:5432/postgres \
    # The path where types will be generated to
    --out=src \
    # The default schema to use
    --defaultSchema=public \
    # The schemas to include. Separate every schema name with a space
    --schemas public pg_catalog \
    # The tables to include. Separate every table name with a space
    --tables actor customer \
    # The path to a JSON config file where you can set the values above
    # You can find a JSON schema you can use to validate your config file at:
    # https://synthql.dev/schemas/synthql.config.json
    --configFile=synthql.config.json
```

## Links

-   [Website](https://synthql.dev)
-   [Docs](https://synthql.dev/docs/getting-started)
-   [X/Twitter](https://twitter.com/fernandohur)
-   [GitHub](https://github.com/synthql/SynthQL)
