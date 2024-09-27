import { col } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { collectLast } from '../..';
import { execute } from '../../execution/execute';
import { PgExecutor } from '../../execution/executors/PgExecutor';
import { createExecutionPlan } from '../../execution/planning/createExecutionPlan';
import { simplifyPlan } from '../../execution/planning/simplifyPlan';
import { describeQuery } from '../../query/describeQuery';
import { compareInventory } from '../compareInventory';
import { from } from '../generated';

import { sql } from '../postgres';
import { pool } from '../queryEngine';

describe('n x m', () => {
    const film = from('film')
        .columns('title')
        .where({
            film_id: col('inventory.film_id'),
        })
        .many();

    const inventory = from('inventory')
        .columns('inventory_id', 'film_id')
        .where({ store_id: col('store.store_id') })
        .include({
            film,
        })
        .many();

    const q = from('store')
        .columns('store_id')
        .include({
            inventory,
        })
        .where({ store_id: 1 })
        .one();

    const execProps = {
        defaultSchema: 'public',
        executors: [
            new PgExecutor({
                defaultSchema: 'public',
                logging: true,
                pool,
            }),
        ],
    };

    test('createExecutionPlan', async () => {
        const plan = createExecutionPlan(q, execProps);
        expect(await simplifyPlan(plan)).toEqual({
            children: [
                {
                    children: [],
                    executor: 'PgExecutor',
                    from: 'film',
                },
            ],
            executor: 'PgExecutor',
            from: 'store, inventory',
        });
    });

    test(`${describeQuery(q)}`, async () => {
        const rows: Array<{
            store_id: number;
            inventory: Array<{
                inventory_id: number;
                film: Array<{
                    title: string;
                }>;
            }>;
        }> = await sql`
        SELECT
            s.store_id,
            jsonb_agg(
                jsonb_build_object(
                    'inventory_id', i.inventory_id,
                    'film', (SELECT jsonb_agg(jsonb_build_object('title', f.title))
                            FROM film f
                            WHERE f.film_id = i.film_id)
                )
            ) AS inventory
        FROM
            store s
        INNER JOIN inventory i ON s.store_id = i.store_id
        WHERE
            s.store_id = 1
        GROUP BY
            s.store_id
        LIMIT 1
        `;

        const result = await collectLast(execute(q, execProps));
        const expected = rows[0];
        expect(result.store_id).toEqual(expected.store_id);

        const expectedInventory = Array.from(expected.inventory).sort(
            compareInventory,
        );
        const resultInventory = Array.from(result.inventory).sort(
            compareInventory,
        );

        expect(resultInventory).toMatchObject(expectedInventory);
    });
});
