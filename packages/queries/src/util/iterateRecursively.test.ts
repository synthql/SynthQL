import { describe, test } from 'vitest';
import { col } from '../col';
import { param } from '../param';
import { from } from '../generated';

describe('iterateRecursively', () => {
    // TODO: complete test or remove it
    test('Find one film_actor with `param()`', () => {
        const q = from('film_actor')
            .columns('actor_id', 'film_id', 'last_update')
            .where({
                actor_id: param(1),
                film_id: param(1),
            })
            .include({
                film: from('film')
                    .columns('film_id', 'title')
                    .where({
                        film_id: col('film_actor.film_id'),
                        language_id: param(1),
                    })
                    .maybe(),
            })
            .maybe();
    });
});
