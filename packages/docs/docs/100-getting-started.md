---
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started

## Install the `npm` packages

Start by installing the SynthQL packages:

### Query builder package

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install @synthql/queries
```

</TabItem>
  
<TabItem value="yarn" label="yarn">

```bash
yarn add @synthql/queries
```

</TabItem>
</Tabs>

### Query engine package

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install @synthql/backend
```

</TabItem>
  
<TabItem value="yarn" label="yarn">

```bash
yarn add @synthql/backend
```

</TabItem>
</Tabs>

### Server-side/full-stack handler function packages

#### Express.js

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install @handler-express
```

</TabItem>
  
<TabItem value="yarn" label="yarn">

```bash
yarn add @handler-express
```

</TabItem>
</Tabs>

#### Next.js

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install @handler-next
```

</TabItem>
  
<TabItem value="yarn" label="yarn">

```bash
yarn add @handler-next
```

</TabItem>
</Tabs>

### Client packages

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install @synthql/react
```

</TabItem>
  
<TabItem value="yarn" label="yarn">

```bash
yarn add @synthql/react
```

</TabItem>
</Tabs>

## Generate database types

Then generate the types and schema definitions from your database, using the `@synthql/cli`.

```bash
npx @synthql/cli generate \
    # The database connection string
    --url=postgres://postgres:postgres@localhost:5432/postgres \
    # The folder where SynthQL will write the generated types
    --out=./src/generated
```

This will generate a types file at `src/generated/db.ts`, a schema definitions file at `src/generated/schema.ts` and an index file that exports both at `src/generated/index.ts`.

## Write your first query

```ts
import { from } from 'src/generated';

const findUserByIds = (ids: string[]) => {
    return (
        from('users')
            // Select which columns you want
            // NOTE: if you want to select all columns, simply don't use
            // this method, and SynthQL will select them internally
            .columns('id', 'email')
            // Filter by IDs
            .filter({ id: { in: ids } })
            // Return the first 100 records that match
            .take(100)
    );
};
```

## Setup the query engine

The `QueryEngine` compiles SynthQL queries into plain SQL and sends them to the database.

```ts
const queryEngine = new QueryEngine({
    url: process.env.DATABASE_URL,
});
```

## Execute the query

### Server-side query execution

```ts
// Execute the `findUserByIds` query
const result = await queryEngine.executeAndWait(findUserByIds());
```

### Client-side query execution

```ts
// Execute the `findUserByIds` query
const result = await queryEngine.executeAndWait(findUserByIds());
```
