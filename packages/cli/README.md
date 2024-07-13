# @synthql/cli

The SynthQL CLI.

## Generate types from your Postgres database

To generate types from your Postgres database schema, use the `generate` command.

```sh
synthql generate \
    # The PG connection string
    --connectionString=postgres://postgres:postgres@localhost:5432/postgres \
    # The path where types will be generated to
    --out=src \
    --defaultSchema=public \
    # The schemas to include. Separate every schema name with a space
    --schemas public pg_catalog
    # The tables to include. Separate every table name with a space
    --tables actor customer
```

## Links

-   [Website](https://synthql.github.io/SynthQL)
-   [Docs](https://synthql.github.io/SynthQL/docs/getting-started)
-   [X/Twitter](https://twitter.com/fernandohur)
-   [GitHub](https://github.com/synthql/SynthQL)
