---
---

# Getting started

## Install the NPM package

Start by installing the SynthQL packages.

```bash
# Backend packages
yarn add @synthql/backend @synthql/queries

# Frontend packages
yarn add @synthql/react @synthql/queries
```

## Generate types

Then generate the types from your database using the `@synthql/cli`.

```bash
npx @synthql/cli generate \
    # The database connection string
    --url=postgres://postgres:postgres@localhost:5432/postgres \
    # The folder where SynthQL will write the generated types
    --out=./src/generated
```

This will generate a file at `src/generated/synthql/db.ts`.

## Write your first query

```ts
import { from } from 'src/db';

const findUserById = (id: string) => {
    return from('users')
        .columns('id', 'email')
        .filter({ id })
        .many();
}
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
