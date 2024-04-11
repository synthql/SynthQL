# @synthql/queries

DSL for writing synthql queries.

```ts
import { from } from './generated.schema';

const query = from('users').columns('id', 'first_name').where({ id: 1 }).many();
```

## Links

-   [Website](https:/synthqlr.github.io/synthql/)
-   [Docs](https://synthql.github.io/synthql/docs/getting-started)
-   [X/Twitter](https://twitter.com/fernandohur)
-   [Github](https://github.com/synthql/synthql)
