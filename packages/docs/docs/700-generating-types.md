# Generating types

To generate a schema, create an instance of the `QueryEngine` and call the `generateSchema` function.

```ts
import { QueryEngine } from "@synthql/backend";

const queryEngine = new QueryEngine({ ... })

await queryEngine.generateSchema({
    schemas: ["public","another_schema"],
    out: "./src/generated/synthql/db.ts"
})
```

Once the schema has been generated, you can import the `from` function to start building type-safe queries.

```ts
import { from } from './src/generated/synthql/db.ts';

function findDog(id: string) {
    return from('dogs').where({ id }).one();
}
```
