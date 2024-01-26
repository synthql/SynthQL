---
---

# Security

Letting clients make arbitrary queries, even if read-only comes with a set of security challenges. XQL comes with built in mechanisms to implement robust authorization logic so you can limit what queries clients can make.

Let's take a look at the different ways XQL ensures only the right queries will be executed into your database.

## Whitelisting queries

By default, the `QueryEngine` will not execute any query. It will only execute known queries. To register a query simply call the `registerQueries` method as follows.

```ts
const from = query<DB>().from;

const users = from('users')
    .select('id','name','email')

const queryEngine = new QueryEngine(opts);

queryEngine.registerQueries(users)
```

What this means is that the `QueryEngine` will only allow queries on the `users` table and will allow any subset of the `id`, `name` and `email` columns to be selected.

This behaviour can be disabled with the `allowUnknownQueries` option.

```ts
const queryEngine = new QueryEngine({..., allowUnknownQueries:true});
```

### Restricting operations
If you want to also restrict the operations on the `users` query you can do so as follows:

```ts
import { anyParam } from "xql";

const users = query<DB>()
    .from('users')
    .select('id','name','email')
    .allowWhere(
        equals('id', anyParam),
        in('id',anyParam)
    )

const queryEngine = new QueryEngine(opts);

queryEngine.registerQueries(users)
```

This will instruct the `QueryEngine` to only allow filtering by  `id = $n` or `id in($n)`

## Column level security

Queries can have access control lists (ACLs) attached to them as follows

```ts
const users = from('users')
    .select('id','name','email')
    .acl('users:read')

const pets = from('pets')
    .select('id','owner_id')
    .acl('pets:read')
    .include({
        owner: users
            .where({ owner_id: col('users.id') })
            .maybe()
    })
```

When executing queries you can pass a list of the user's current ACLs

```ts
queryEngine.execute(query, {acl})
```

The query engine will traverse the query recursively and reject the query unless it meets all the ACL requirements.


## Row level security

Using the `transformQuery` function you can build

```ts
transformQuery(rootQuery, {
    predicate: (query) => query.from === 'pets',
    map: (query) => {
        if (user.canOnlyAccessDogsWithOwner) {}
    }
})
```

## Exposing your DB schema

XQL doesn't reveal your entire schema, only the subset that is present in your queries.

- Supabase
- Hasura
- 