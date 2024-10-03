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
        .groupBy('payment_id', 'payment_date')
        .many();

    // TODO: fix the payment_date format and unskip the test
    test.skip(describeQuery(q), async () => {
        const pgExecutor = new PgExecutor({
            defaultSchema: 'public',
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
                to_json(payment_date::timestamptz) as payment_date -- // TODO: format the payment_date to match the shape returned from the SynthQL query result: "2022-03-23 10:10:40.26828+00", which has any zeros after last significant microsecond digit removed
            FROM
                public.payment
            GROUP BY
                payment_id,
                payment_date
        `;

        expect(result).toEqual(expected);
    });
});
