# Examples

## Find a single user via id using `select()`

Finds 0 or 1 record(s) in the `user` table where the `id` is in the list of ids.

```ts
const q = from('users')
    .select({ id: true, name: true })
    .where({ id: { in: ['1'] } })
    .maybe();

return useSynthql<DB, 'users', typeof q>(q);
```

## Find all users with ids in the list using `select()`

Finds 0 or n records in the `users` table where their `id` is in the list of ids.

```ts
const q = from('users')
    .select({ id: true, name: true })
    .where({ id: { in: ids } })
    .many();

const result: UseQueryResult<Array<{ id: string; name: string }>> = useSynthql<
    DB,
    'users',
    typeof q
>(q);

return result;
```

## Find a single actor via id using `columns()`

Finds 0 or 1 record(s) in the `actors` table where the `id` is in the list of ids.

```ts
const q = fromPagila('actor')
    .columns('actor_id', 'first_name', 'last_name')
    .groupingId('actor_id')
    .where({ actor_id: { in: [1, 2] } })
    .maybe();

return useSynthql<PagilaDB, 'actor', typeof q>(q);
```

## Find all actors with ids in the list using `columns()`

Finds 0 or n records in the `actors` table where their `id` is in the list of ids.

```ts
const q = fromPagila('actor')
    .columns('actor_id', 'first_name', 'last_name')
    .groupingId('actor_id')
    .where({ actor_id: { in: ids } })
    .many();

return useSynthql<PagilaDB, 'actor', typeof q>(q);
```
