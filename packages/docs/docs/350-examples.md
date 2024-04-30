# Examples

## Find a single user by id using `select()`

Finds 0 or 1 record(s) in the `user` table where the `id` is in the list of ids.

```ts
const q = fromEcho('users')
    .select({ id: true, name: true })
    .where({ id: { in: ['1'] } })
    .maybe();

const result = useSynthql<EchoDB, 'users', typeof q>(q);
```

## Find a single actor by id using `columns()`

Finds 0 or 1 record(s) in the `actors` table where the `id` is in the list of ids.

```ts
const q = fromPagila('actor')
    .columns('actor_id', 'first_name', 'last_name')
    .groupingId('actor_id')
    .where({ actor_id: { in: [1] } })
    .maybe();
```

## Find all actors by ids using `columns()`

Finds all the records in the `actors` table where their `id` is in the list of ids.

```ts
const q = fromPagila('actor')
    .columns('actor_id', 'first_name', 'last_name')
    .groupingId('actor_id')
    .where({ actor_id: { in: ids } })
    .many();
```

## Find a single actor by id with a single-level-deep`include()`

Finds 1 record in the `customers` table where the `id` is in the list of ids.

```ts
const store = fromPagila('store')
    .columns('store_id', 'address_id', 'manager_staff_id')
    .groupingId('store_id')
    .where({
        store_id: col('customer.store_id'),
    })
    .one();

const q = fromPagila('customer')
    .columns('customer_id', 'store_id', 'first_name', 'last_name', 'email')
    .groupingId('customer_id')
    .where({ customer_id: { in: [1] } })
    .include({ store })
    .one();
```

## Find a single customer by id with a two-level-deep `include()`

Finds 1 record in the `customers` table where the `id` is in the list of ids.

```ts
const address = fromPagila('address')
    .columns('address_id', 'address', 'district')
    .groupingId('address_id')
    .where({
        address_id: col('store.address_id'),
    })
    .one();

const store = fromPagila('store')
    .columns('store_id', 'address_id', 'manager_staff_id')
    .groupingId('store_id')
    .where({
        store_id: col('customer.store_id'),
    })
    .include({ address })
    .one();

const q = fromPagila('customer')
    .columns('customer_id', 'store_id', 'first_name', 'last_name', 'email')
    .groupingId('customer_id')
    .where({ customer_id: { in: [4] } })
    .include({ store })
    .one();

const result = renderSynthqlQuery<PagilaDB, 'customer', typeof q>({
    query: q,
    server: pagilaServer,
});
```
