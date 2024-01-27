# @xql/queries

Provides the query builder, which gives most of the DX for writing queries.

This package is separate so it can be shared by client and server bundles.

```ts
import { query } from '@xql/client';
import { from } from '@/db';

const findPetsByOwner = (owner) => {
    return from('pets')
        .select({ id: true, name: true })
        .where({ owner })
        .many();
};

const findUserById = (id: string) => {
    const pets = findPetsByOwner(col('users.id'));
    return from('users')
        .select({ id: true, name: true })
        .where({ id })
        .include({ pets })
        .maybe();
};
```
