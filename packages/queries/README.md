# @synthql/queries

DSL for writing SynthQL queries.

```ts
import { from } from './generated.schema';

const findUserById = (id: number) =>
    from('users').columns('id', 'first_name').where({ id }).many();
```

## Links

-   [Website](https://synthql.github.io/SynthQL/)
-   [Docs](https://synthql.github.io/SynthQL/docs/getting-started)
-   [X/Twitter](https://twitter.com/fernandohur)
-   [GitHub](https://github.com/synthql/synthql)
