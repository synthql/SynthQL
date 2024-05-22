import {
    filmActor,
    actor,
    inventory,
    film,
    store,
} from '../../../tests/queries.v2';
import { describe, expect, test } from 'vitest';
import { col } from '@synthql/queries';
import { PgExecutor } from '.';
import { pool } from '../../../tests/queryEngine';
import { DB } from '../../../tests/generated';

describe('PgExecutor', () => {
    const executor = new PgExecutor<DB>({
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

        expect(executor.canExecute(q)).toEqual({
            query: {
                ...q,
                include: { inventories: { ...inventories, include: {} } },
            },
            remaining: [inventories.include.film],
        });
    });
});
