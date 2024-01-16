# XQL

A full stack, type-safe client to your postgresql database with a focus on DX and performance.

XQL let's you query your database directly from the browser, helping you create large object graphs without the need for custom endpoints and using backend resources.

## Phylosophy

-   APIs support either 1M clients (e.g. Stripe) or 1-2 (Your typical BE API serving a browser & mobile app).
-   The client has the best knowledge on what API it needs.
-   The client knows which resources are needed at which time, thus providing valuable insight into building performant queries.
-   Graphql has lots of great ideas, but is way too complicated for most companies.

# Features

-   Type safe
-   Composable queries
-   Lazy streaming queries
-   Queries are plain data
-   Authorization
-   Full-stack
-   Caching layer

## Type safe

The SQX schema is auto-generated from your database's schema with a simple command:

```bash
npx sqx generate:schema
```

## Composable queries

SQX let's you build very large object graphs by composing smaller queries. The individual queries will be combined into a single, efficient SQL join.

Here's an example: Fetching OTS parts with manufacturers.

```ts
function manufacturer() {
    return query<DB>()
        .from('public.manufacturer')
        .select('id','name')
}
function otsPart() {
    const manfuacturerId = ref<DB>()
        .table('public.off_the_shelf_part')
        .column('manufacturer');

    const manufacturer = manufacturer()
        .where({ id: manufacturerId })
        .one()

    return query<DB>()
        .from('public.off_the_shelf_part'),
        .select('id','mpn')
        .include({ manufacturer })
}

function findPartOption() {
    const otsPart = otsPart()
        .where({ id: ref<DB>().table('part_option').column('off_the_shelf_part_id') })
        .many()

    return query<DB>()
        .from('part_option')
        .select('id')
        .include({
            otsPart,
            customPart: ...,
            ipn: ...
        })
}
```

## Lazy streaming results

By default the entire query will be compiled into a single large SQL join. This will give good performance for small object graphs (say 1-5 levels deep), but as the object graph grows, so will the time it takes until the query is resolved and the data is eventually sent to the client.

To solve this problem, SQX let's you define lazy, streaming queries. A lazy query defines a boundary by which the SQX query is split into two separate SQL queries. As soon as the results for the first query are obtained the data is sent to the client.

Here's an example: Imagine you want to fetch all OTS parts with all the associated OTS offers. The parts can be fetched very quickly since there are only few of them per BOM (100-1000), but every part can have ~100 offers, so we're taking about (100.000 to 1.000.000) offers.

Loading 1M offers will be slow, no matter what you do, but by loading the offers asynchronously we can show some progress to the user while the offers are loaded in the background. Here's how that would look:

```ts
// First define a view on the OTS offers table
function otsOffers() {
    return query<DB>()
        .from('off_the_shelf_offers')
        .select('id','price_breaks','created_at')
}

function otsPart() {
    const part = ref<DB>()
        .table('public.off_the_shelf_part')
        .column('id')

    // Filter the offers by part ID,
    // but mark the query as .lazy()
    const offers = otsOffers()
        .where({ part })
        .lazy()
        .many()

    return query<DB>()
        .from('public.off_the_shelf_part'),
        .select('id','mpn')
        .include({
            offers,
            manufacturer: ...
        })
}
```

This will be sent to the client using JSONL, meaning one JSON.stringify per line

```json
// send the first line of JSON with the parts and manufacturers
[ { id: '1', mpn:'1', offers: {status:'pending'} }, ...  ]
// once the offers are loaded, sent the entire structure
[ { id: '1', mpn:'1', offers: { status:'done', offers: [...] } }, ...  ]
```

Lazy queries are a really powerful feature, and once you start thinking about them you will see them everywhere. Here's another example:

When you fetch an RFQ, you most likely also want to fetch the BOM structure, the design items,
and the sourcing scenarios, but you don't want to wait for all that data to load to render the
page. Lazy queries to the rescue:
You would load the RFQ eagerly, and lasily load the BOM structure, and the sourcing scenarios.

```
RFQ (eager)
    - Top level assembly (lazy)
        - Design items (eager)
    - Sourcing scenarios  (lazy)
        - Solutions (lazy)
        - Solution configs (eager)
```

## Queries are plain data

XQL queries are plain JS objects. As such they can be serialized, sent over the wire, etc.
This means you can compose queries directly from your FE, and send them securely to the BE
for execution. This is awesome as it means you get e2e type-safety (FE/BE/DB) with minimal
effort.

This is how queries look

```ts
{
    from: "public.off_the_shelf_offer",
    where: {
        id: { in: '$1' },
    },
    select: {
        id: true,
        mpn: true,
    },
    cardinality: 'many',
    include: {
        manufacturer: {...}
    },
    acl: ['view:users'],
}
```

Another cool thing about queries being _just data_ is that you can easily build functions
that operate on queries. For example, here's a function that takes a query as input and makes it lazy.

```ts
function lazy<T>(query): T & { lazy: true } {
    return { ...query, lazy: true };
}
```

Another example would be a function that restricts the parameters that are allowed on a query to the manufacturers table. You could use this query to make sure that clients don't filter by attributes that would cause a full table scan.

```ts
function checkParams(query: Query<DB, 'public.manufacturers'>) {
    const allowedParams = new Set(['id']);
    const params = Object.keys(query.where);
    for (const param of params) {
        if (!allowedParams.includes(param)) {
            throw new Error('You can only query public.manufacturers by ID');
        }
    }
}
```

## Authorization

ACL lists can be defined at the query/view level.
When the engine executes a query it will throw unless all the required permissions are met.

The following example defines a view on the users table indicating that queries
over this view can only be executed if the user has the 'view:users' permission.

```ts
const users() {
    query<DB>()
        .from('users')
        .acl(['view:users'])
        .select('id','name','email')
}
```

## Full-stack

Queries & views can be shared between node and the browser.

This means queries can be composed in the client, and sent to the BE to execute. You get type-safety e2e without having to spend BE resources building endpoints.

## Caching

{
['public.manufacturers'+'id']: {...},
['public.off_the_shelf_offers'+'id']: {...}
}

## Easy to integrate with React Query

```ts
function useXql<TTable extends Table<DB>>(
    query: Query<DB, TTable>,
    queryProps,
) {
    const {} = useQuery({
        queryKey: xqlQuery(query.table, query),
        queryFn: () => {
            return engine.execute(theQuery);
        },
        ...queryProps,
    });
}

export function xqlQuery<TTable extends Table<DB>>(
    table: TTable,
    query?: Query<DB, TTable>,
) {
    if (query) {
        return [table, query];
    }
    return [table];
}
```

This way you can easily invalidate queries to a `table`

# What is XQL not good for?

## Public facing APIs

As XQL queries are tightly coupled to your database schema, it means that when you
change your database schema you also need to update your clients.

For this reason, we do not recommend using XQL for public facing APIs that have long
migration windows.

## Analytical loads

XQL is optimized for transactional queries. Analytical loads will likely have poor performance.

# How does XQL compare against ...?

# Tomas' thoughts

-   Security aspect: exposing DB internals.
    -   Not fetching data from a different schema
-   Performance: FE doesn't know DB perf.
-   Understanding/debugging peformance problems.
-   Prepared queries?
-   Dog fooding of public facing APIs will no longer happen.
-   What problem does it solve?
    -   FE being blocked by BE
    -   Friction might shift to DB changes breaking FE.
    -   Fernando:
        -   Development speed
        -   FE join problem: speed & complexity problem.
-   Tomas doesn't hate it
-   Two languages: not that big of an issue.
-   Next steps?
    -   Think about security.
    -   Think about ways of giving evidence of development speed gains
        -   Is querying existing data in new ways so common?
    -   Think about schema changes and their impact

# Timon's thoughts

-   What does Fernando think is risky?
    -   New tech
    -   Maybe perf is not as good as I think will be
    -   Implementation taking too long
    -   Permission sync
-   Doen't hate it
-   Get more thoughts from engineers
-

GET /users

db.users.findMany(...)
