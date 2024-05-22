import { describe, expect, test } from 'vitest';
import { DB, from } from '../generated';

import { describeQuery } from '../../query/describeQuery';
import { PgExecutor } from '../../execution/executors/PgExecutor';
import { pool } from '../queryEngine';
import { execute } from '../../execution/execute';
import { collectLast } from '../..';
import { sql } from '../postgres';

describe('e2e', () => {
    const q = from('payment')
        .columns('payment_id', 'amount', 'payment_date')
        .groupingId('payment_id', 'payment_date')
        .many();

    test(describeQuery(q), async () => {
        const pgExecutor = new PgExecutor<DB>({
            defaultSchema: 'public',
            logging: true,
            pool,
        });
        const execProps = {
            defaultSchema: 'public',
            executors: [pgExecutor],
        };

        const result = await collectLast(execute<DB, typeof q>(q, execProps));

        const expected = await sql`
            SELECT
                payment_id,
                amount,
                payment_date
            FROM
                public.payment
            GROUP BY
                payment_id,
                payment_date
        `;

        expect(result).toEqual(expected);
    });
});
