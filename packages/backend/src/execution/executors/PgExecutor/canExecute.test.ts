import { col } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { PgExecutor } from '.';
import {
    actor,
    film,
    filmActor,
    inventory,
    store,
} from '../../../tests/queries.v2';
import { pool } from '../../../tests/queryEngine';

describe('PgExecutor', () => {
    const executor = new PgExecutor({
        pool,
        defaultSchema: 'public',
    });

    test('canExecute', () => {
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
                    .many(),
            })
            .where({ store_id: col('store.store_id') })
            .many();

        const q = store()
            .include({
                inventories,
            })
            .where({ store_id: { in: [1] } })
            .one();

        expect(executor.canExecute(q)).toMatchObject({
            query: {
                ...q,
                include: { inventories: { ...inventories, include: {} } },
            },
            remaining: [inventories.include?.film],
        });
    });
});
