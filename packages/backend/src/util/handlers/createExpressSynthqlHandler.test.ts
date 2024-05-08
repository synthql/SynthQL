import { describe, test } from 'vitest';
import { query } from '@synthql/queries';

import { DB } from '../../tests/db';
const from = query<DB>().from;

describe('createExpressSynthqlHandler', () => {
    test(`Query execution is successful`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .groupingId('actor_id')
            .where({ actor_id: { in: [1] } })
            .one();
    });

    test(`Query execution is successful with returnLastOnly passed`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .groupingId('actor_id')
            .where({ actor_id: { in: [1] } })
            .maybe();
    });
});
