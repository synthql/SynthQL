# @synthql/backend

The SynthQL backend.

```ts
import { QueryEngine } from "@synthql/backend"

// Initialize the client
const queryEngine = new QueryEngine({...})

// Write your query
const query = from('users')
    .columns('id','first_name')
    .where({id: {in:[1,2,3]}})
    .many()

// Execute the query
queryEngine.execute(query);
```

## Links

-   [Website](https://synthql.github.io/synthql/)
-   [Docs](https://synthql.github.io/synthql/docs/getting-started)
-   [X/Twitter](https://twitter.com/fernandohur)
-   [Github](https://github.com/synthql/synthql)
