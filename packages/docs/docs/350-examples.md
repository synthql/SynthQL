# Examples

 ## Find all users with ids in the list

Finds all records in the `users` table where the `id` is in the list of ids.


```ts
const q = from('users')
    .columns('id', 'name')
    .where({ id: { in: ids } })
    .many();

const result: UseQueryResult<
    Array<{ id: string; name: string }>
> = useSynthql<DB, 'users', typeof q>(q);


```