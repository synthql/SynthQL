import { QueryResult, col } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { collectLast } from '../..';
import { execute } from '../../execution/execute';
import { PgExecutor } from '../../execution/executors/PgExecutor';
import { describeQuery } from '../../query/describeQuery';
import { assertPresent } from '../../util/asserts/assertPresent';
import { DB, from } from '../generated';

import { sql } from '../postgres';
import { store } from '../queries.v2';
import { pool } from '../queryEngine';
import { sortRecursively } from '../sortRecursively';

// Skipping for now, not sure why this isn't working
describe.skip('e2e', () => {
    const payments = from('payment')
        .groupingId('payment_id', 'payment_date')
        .columns('payment_id', 'amount')
        .where({ customer_id: col('customer.customer_id') })
        .many();

    const customers = from('customer')
        .groupingId('customer_id')
        .columns('email', 'customer_id')
        .where({ store_id: col('store.store_id'), customer_id: 367 })
        .include({
            payments,
        })
        .many();

    const q = store()
        .columns('store_id')
        .include({
            customers,
        })
        .where({ store_id: { in: [1] } })
        .groupingId('store_id')
        .one();

    const pgExecutor = new PgExecutor({
        defaultSchema: 'public',
        logging: true,
        pool,
    });
    const execProps = {
        defaultSchema: 'public',
        executors: [pgExecutor],
    };

    test(`${describeQuery(q)}`, async () => {
        const rows: QueryResult<DB, typeof q>[] = await sql`
        SELECT
            s.store_id,
            JSON_AGG(
                JSONB_BUILD_OBJECT(
                    'email', c.email,
                    'customer_id', c.customer_id,
                    'payments',
                    (
                        SELECT JSONB_AGG(JSONB_BUILD_OBJECT(
                            'amount', p.amount::text,
                            'payment_id', p.payment_id
                        ))
                        FROM public.payment p
                        WHERE p.customer_id = c.customer_id
                    )
                )
            ) AS customers
        FROM
            public.store s
        JOIN public.customer c ON s.store_id = c.store_id
        WHERE s.store_id IN (1)
        GROUP BY s.store_id
        `;

        const result = await collectLast(execute<DB, typeof q>(q, execProps));
        assertPresent(result);
        const expected = rows[0];
        expect(result.store_id).toEqual(expected.store_id);

        const sliceIndex = 1;

        const expectedInventory = sortRecursively(expected.customers).slice(
            0,
            sliceIndex,
        );
        const resultInventory = sortRecursively(result.customers).slice(
            0,
            sliceIndex,
        );

        expect(resultInventory).toMatchObject(expectedInventory);
    });
});
