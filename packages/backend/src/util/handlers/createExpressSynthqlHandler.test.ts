import { describe, test } from 'vitest';

import { from } from '../../tests/generated';

describe('createExpressSynthqlHandler', () => {
    test(`Query execution is successful`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: { in: [1] } })
            .one();
    });

    test(`Query execution is successful with returnLastOnly passed`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: { in: [1] } })
            .maybe();
    });
});
