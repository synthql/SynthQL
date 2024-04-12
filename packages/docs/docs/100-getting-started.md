---
---

# Getting started

## Install the NPM package

Start by installing the SynthQL packages

```bash
# Backend packages
yarn add @synthql/backend @synthql/queries @synthql/cli

# Frontend packages
yarn add @synthql/react @synthql/queries
```

## Generate types

Then generate the types from your database.

```bash
# --url is the database connection URL
# --dir is the path where the schema will be generated [Defaults to src/]
yarn run synthql generate --url '...' --dir 'src/'
```

This will generate a file at `src/db.ts`

## Write your first query

```ts
import { from } from 'src/db';

const users = from('users').select('id', 'email').many();
```

## Setup the query engine

The QueryEngine compiles XQL queries into SQL and sends them to the DB.

```ts
const queryEngine = new QueryEngine({
    url: process.env.DATABASE_URL!,
});

// execute the users query
queryEngine.execute(users);
```
