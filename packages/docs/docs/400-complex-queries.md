# Complex queries

## Having

Find all users with more than 5 pets

```ts
import { from } from '@/db';

const pet = from('pet').select('name', 'age');

const petsFromOwner = pet
    .where({
        owner_id: col('users.id'),
    })
    .many();

const users = from('users')
    .select('id', 'email')
    .include({ pets: petsFromOwner })
    .having(gt(count(pets), 5));
```

```ts
import { from, Exp } from '@/db';
import { sub, currentDate, interval, gte } from '@synthql/queries';

function inThePast3Months(exp: Exp) {
    return gte(exp, sub(currentDate, interval('3 months')));
}
```
