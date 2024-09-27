import { QueryResult, col } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { collectLast } from '../..';
import { execute } from '../../execution/execute';
import { PgExecutor } from '../../execution/executors/PgExecutor';
import { describeQuery } from '../../query/describeQuery';
import { assertPresent } from '../../util/asserts/assertPresent';
import { compareInventory } from '../compareInventory';
import { DB } from '../generated';
import { sql } from '../postgres';
import { actor, film, filmActor, inventory, store } from '../queries.v2';
import { pool } from '../queryEngine';

describe('e2e', () => {
    const actors = filmActor()
        .include({
            actor: actor()
                .where({ actor_id: col('film_actor.actor_id') })
                .one(),
        })
        .where({ film_id: col('film.film_id') })
        .many();

    const inventories = inventory()
        .include({
            film: film()
                .include({ actors })
                .where({ film_id: col('inventory.film_id') })
                .one(),
        })
        .where({ store_id: col('store.store_id') })
        .many();

    const q = store()
        .include({
            inventories,
        })
        .where({ store_id: { in: [1] } })
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
            jsonb_agg(
                jsonb_build_object(
                    'inventory_id', i.inventory_id,
                    'film', jsonb_build_object(
                        'title', f.title,
                        'actors', (SELECT jsonb_agg(jsonb_build_object('actor', jsonb_build_object('actor_id', a.actor_id)))
                                FROM film_actor fa
                                JOIN actor a ON fa.actor_id = a.actor_id
                                WHERE fa.film_id = f.film_id)
                    )
                )
            ) AS inventories
        FROM
            store s
        JOIN inventory i ON s.store_id = i.store_id
        JOIN film f ON i.film_id = f.film_id
        WHERE s.store_id = 1
        GROUP BY
            s.store_id
        `;

        const result = await collectLast(execute(q, execProps));
        assertPresent(result);
        const expected = rows[0];
        expect(result.store_id).toEqual(expected.store_id);

        const sliceIndex = 50;
        const expectedInventory = Array.from(expected.inventories)
            .sort(compareInventory)
            .slice(0, sliceIndex);
        const resultInventory = Array.from(result.inventories)
            .sort(compareInventory)
            .slice(0, sliceIndex);

        expect(resultInventory).toMatchObject(expectedInventory);
    });
});
