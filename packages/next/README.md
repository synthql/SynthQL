# @synthql/next

SynthQL-compatible route handler function for use in Next.js App Router.

```ts
// src/queryEngine.ts
import { QueryEngine } from '@synthql/backend';

export const queryEngine = new QueryEngine({
    url: process.env.DATABASE_URL,
});

// src/app/[...synthql]/route.ts
import { createNextSynthqlHandler } from '@synthql/next';
import { queryEngine } from './queryEngine';

const nextSynthqlRequestHandler = createNextSynthqlHandler(queryEngine);

export async function POST(request: Request) {
    return await nextSynthqlRequestHandler(request);
}
```

## Links

-   [Website](https://synthql.dev)
-   [Docs](https://synthql.dev/docs/getting-started)
-   [X/Twitter](https://twitter.com/fernandohur)
-   [GitHub](https://github.com/synthql/SynthQL)
