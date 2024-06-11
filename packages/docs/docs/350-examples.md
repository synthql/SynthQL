# Examples

## Find a single user by id using `select()`

Finds 0 or 1 record(s) in the `user` table where the `id` is in the list of ids

```ts
const q = from('users')
    .select({ id: true, name: true })
    .where({ id: { in: ['1'] } })
    .maybe();

const result = useSynthql<DB, 'users', typeof q>(q);
```
