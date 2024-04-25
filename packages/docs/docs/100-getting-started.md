---
---

# Getting started

## Install the NPM package

Start by installing the SynthQL packages.

```bash
# Backend packages
yarn add @synthql/backend @synthql/queries @synthql/cli

# Frontend packages
yarn add @synthql/react @synthql/queries
```

## Generate types

Then generate the types from your database using the `@synthql/cli`.

```bash
# --url is the database connection URL
# --dir is the path where the schema will be generated [Defaults to src/]
yarn run synthql generate --connectionString=postgres://postgres:postgres@localhost:5432/postgres --out=src --defaultSchema=public --schemas public pg_catalog
```

This will generate a file at `src/generated/synthql/db.ts`.

## Write your first query

```ts
import { from } from 'src/db';

const users = from('users').select('id', 'email').many();
```

## Setup the query engine

The QueryEngine compiles SynthQL queries into SQL and sends them to the database.

```ts
const queryEngine = new QueryEngine({
    url: process.env.DATABASE_URL,
});

// execute the users query
queryEngine.execute(users);
```
