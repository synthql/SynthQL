import { col } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { collectLast } from '../..';
import { execute } from '../../execution/execute';
import { executePlan } from '../../execution/execution/executePlan';
import { PgExecutor } from '../../execution/executors/PgExecutor';
import { createExecutionPlan } from '../../execution/planning/createExecutionPlan';
import { simplifyPlan } from '../../execution/planning/simplifyPlan';
import { describeQuery } from '../../query/describeQuery';
import { selectKeys } from '../../util/tree/selectKeys';
import { compareInventory } from '../compareInventory';
import { DB, from } from '../generated.schema';
import { sql } from '../postgres';
import { pool } from '../queryEngine';

describe('n x m', () => {

    const film = from('public.film')
        .columns('title')
        .where({
            film_id: col('public.inventory.film_id')
        })
        .groupingId('film_id')
        .many()

    const inventory = from('public.inventory')
        .columns('inventory_id', 'film_id')
        .where({ store_id: col('public.store.store_id') })
        .include({
            film
        })
        .groupingId('inventory_id')
        .many()

    const q = from('public.store')
        .columns('store_id')
        .include({
            inventory
        })
        .groupingId('store_id')
        .where({ store_id: 1 })
        .one()

    const execProps = {
        defaultSchema: 'public',
        executors: [
            new PgExecutor({
                defaultSchema: 'public',
                logging: true,
                pool,
            })
        ]
    }

    test('createExecutionPlan', async () => {
        const plan = createExecutionPlan(q, execProps)
        expect(await simplifyPlan(plan)).toEqual(
            {
                "children": [
                    {
                        "children": [],
                        "executor": "PgExecutor",
                        "from": "public.film",
                    },
                ],
                "executor": "PgExecutor",
                "from": "public.store, public.inventory",
            }
        )
    })

    test(`${describeQuery(q)}`, async () => {
        const rows: Array<{
            store_id: number,
            inventory: Array<{
                inventory_id: number,
                film: Array<{
                    title: string
                }>
            }>

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
        `

        const result = await collectLast(
            execute<DB, typeof q>(q, execProps)
        )
        const expected = rows[0]
        expect(result.store_id).toEqual(expected.store_id);

        const expectedInventory = Array.from(expected.inventory).sort(compareInventory);
        const resultInventory = Array.from(result.inventory).sort(compareInventory);

        expect(resultInventory).toMatchObject(expectedInventory);
    });
});
