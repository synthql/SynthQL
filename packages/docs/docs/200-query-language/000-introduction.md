# Introduction

SynthQL comes with a simple, but powerful query language. Let's see a few examples:

## Find user by ID

```ts
import { from } from './db';

const users = from('users').columns('id', 'name');

export function findUserById(id: string) {
    return users.where({ id }).maybe();
}
```

## Find users by IDs

```tsx
import { from } from './db';

const users = from('users').columns('id', 'name');

export function findUserById(ids: string[]) {
    return users.where({ id: { in: ids } }).maybe();
}
```

## Find users with pets (1 to n relation)

```tsx
import { from } from './db';

const pets = from('pets').columns('id', 'name', 'owner_id');

const users = from('users').columns('id', 'name');

export function findUserByIds(ids: string[]) {
    const pets = pets
        .where({
            owner_id: col('users.id'),
        })
        .many();
    return users
        .include({
            pets,
        })
        .where({ id: { in: ids } })
        .maybe();
}
```

This query will return the following shape:

```ts
Array<{
    id: string;
    name: string;
    pets: Array<{ id: string; name: string }>;
}>;
```
