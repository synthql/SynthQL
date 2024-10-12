# Examples

## Find a single actor by id with all selectable columns auto-selected

Finds 0 or 1 record(s) in the `actors` table where the `id` is in the list of ids and return all selectable columns

```ts
const q = from('actor')
    .where({ actor_id: { in: [1] } })
    .one();
```

## Find a single actor by id with columns to return specified`

Finds 0 or 1 record(s) in the `actors` table where the `id` is in the list of ids, and returns all selectable columns passed

```ts
const q = from('actor')
    .columns('actor_id', 'first_name', 'last_name')
    .where({ actor_id: { in: [1] } })
    .maybe();
```

## Find a single actor with no filters specified

Finds 0 or 1 record(s) in the `actors` table

```ts
const q = from('actor').columns('actor_id', 'first_name', 'last_name').one();
```

## Find a single actor with offset value specified

Finds 0 or 1 record(s) in the `actors` starting from the offset value position

```ts
const q = from('actor')
    .columns('actor_id', 'first_name', 'last_name')
    .offset(1)
    .one();
```

## Find a single actor with limit of results to return specified

Finds n record(s) in the `actors`, where `n` is the value passed to `limit()`

```ts
const q = from('actor')
    .columns('actor_id', 'first_name', 'last_name')
    .limit(2)
    .many();
```

## Find a single actor with number of results to take specified

Finds n record(s) in the `actors`, where `n` is the value passed to `take()`

```ts
const q = from('actor').columns('actor_id', 'first_name', 'last_name').take(2);
```

## Find all actors by ids columns to return specified`

Finds all the records in the `actors` table where their `id` is in the list of ids, and returns all selectable columns passed

```ts
const q = from('actor')
    .columns('actor_id', 'first_name', 'last_name')
    .where({ actor_id: { in: ids } })
    .many();
```

## Find a single actor by id with a single-level-deep `include()`

Finds 1 record in the `customers` table where the `id` is in the list of ids

```ts
const store = from('store')
    .columns('store_id', 'address_id', 'manager_staff_id', 'last_update')
    .where({
        store_id: col('customer.store_id'),
    })
    .one();

const q = from('customer')
    .columns(
        'customer_id',
        'store_id',
        'first_name',
        'last_name',
        'email',
        'last_update',
    )
    .where({ customer_id: { in: [1] } })
    .include({ store })
    .one();
```

## Find a single customer by id with a two-level-deep `include()`

Finds 1 record in the `customers` table where the `id` is in the list of ids

```ts
const address = from('address')
    .columns('address_id', 'city_id', 'address', 'district', 'last_update')
    .where({
        address_id: col('store.address_id'),
    })
    .one();

const store = from('store')
    .columns('store_id', 'address_id', 'manager_staff_id', 'last_update')
    .where({
        store_id: col('customer.store_id'),
    })
    .include({ address })
    .one();

const q = from('customer')
    .columns(
        'customer_id',
        'store_id',
        'first_name',
        'last_name',
        'email',
        'last_update',
    )
    .where({ customer_id: { in: [4] } })
    .include({ store })
    .one();
```

## Find a single customer by id with a three-level-deep `include()`

Finds 1 record in the `customers` table where the `id` is in the list of ids

```ts
const city = from('city')
    .columns('city_id', 'country_id', 'city', 'last_update')
    .where({
        city_id: col('address.city_id'),
    })
    .one();

const address = from('address')
    .columns('address_id', 'city_id', 'address', 'district', 'last_update')
    .where({
        address_id: col('store.address_id'),
    })
    .include({ city })
    .one();

const store = from('store')
    .columns('store_id', 'address_id', 'manager_staff_id', 'last_update')
    .where({
        store_id: col('customer.store_id'),
    })
    .include({ address })
    .one();

const q = from('customer')
    .columns(
        'customer_id',
        'store_id',
        'first_name',
        'last_name',
        'email',
        'last_update',
    )
    .where({ customer_id: { in: [4] } })
    .include({ store })
    .one();
```

## Find a single customer by id with a four-level-deep `include()`

Finds 1 record in the `customers` table where the `id` is in the list of ids

```ts
const country = from('country')
    .columns('country_id', 'country', 'last_update')
    .where({
        country_id: col('city.country_id'),
    })
    .one();

const city = from('city')
    .columns('city_id', 'city', 'country_id', 'last_update')
    .where({
        city_id: col('address.city_id'),
    })
    .include({ country })
    .one();

const address = from('address')
    .columns('address_id', 'city_id', 'address', 'district', 'last_update')
    .where({
        address_id: col('store.address_id'),
    })
    .include({ city })
    .one();

const store = from('store')
    .columns('store_id', 'address_id', 'manager_staff_id', 'last_update')
    .where({
        store_id: col('customer.store_id'),
    })
    .include({ address })
    .one();

const q = from('customer')
    .columns(
        'customer_id',
        'store_id',
        'first_name',
        'last_name',
        'email',
        'last_update',
    )
    .where({ customer_id: { in: [4] } })
    .include({ store })
    .one();
```
