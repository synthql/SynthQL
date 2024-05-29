# @synthql/cli

The SynthQL CLI.

## Generate types from your PG database

To generate types from your PG database schema, use the `generate` command.

```sh
synthql generate \
    # The PG connection string.
    --connectionString=postgres://postgres:postgres@localhost:5432/postgres \
    # The path where types will be generated to
    --out=src \
    --defaultSchema=public \
    # The schemas to include. Separate every schema with a space.
    --schemas public pg_catalog
```

## Links

-   [Website](https://synthql.github.io/SynthQL)
-   [Docs](https://synthql.github.io/SynthQL/docs/getting-started)
-   [X/Twitter](https://twitter.com/fernandohur)
-   [GitHub](https://github.com/synthql/SynthQL)
