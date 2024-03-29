import { describe, expect, test } from 'vitest';
import { film, store } from '../tests/queries.v2';
import { describeQuery } from './describeQuery';
import { splitQueryAtBoundary } from './splitQueryAtBoundary';
import { removeIndentation } from '../tests/removeIndentation';
import { AnyQuery } from '../types';

describe('splitQueryAtBoundary', () => {
    test('film', () => {
        const q = film().where({ film_id: 1 }).maybe();

        expect(describeQuery(q)).toEqual(
            removeIndentation(`
          film:
              film_actor: film_actor.film_id = film.film_id
                  actor: actor.actor_id = film_actor.actor_id
              language: language.language_id = film.language_id
        `),
        );

        const { query, remaining } = splitQueryAtBoundary<AnyQuery>(
            q,
            (q) => q.from === 'public.film_actor',
        );
        expect(describeQuery(query)).toEqual(
            removeIndentation(`
          film:
              language: language.language_id = film.language_id
        `),
        );
        expect(remaining.length).toBe(1);
        expect(describeQuery(remaining[0])).toEqual(
            removeIndentation(`
            film_actor: film_actor.film_id = film.film_id
                actor: actor.actor_id = film_actor.actor_id`),
        );
    });

    test('store', () => {
        const q = store().where({ store_id: 1 }).maybe();

        expect(describeQuery(q)).toEqual(
            removeIndentation(`
          "store:
              inventory: inventory.store_id = store.store_id
                  film: film.film_id = inventory.film_id
                      film_actor: film_actor.film_id = film.film_id
                          actor: actor.actor_id = film_actor.actor_id
                      language: language.language_id = film.language_id
              address: address.address_id = store.address_id
                  city: city.city_id = address.city_id"
        `),
        );

        const { query, remaining } = splitQueryAtBoundary<AnyQuery>(
            q,
            (q) => q.from === 'public.film',
        );

        expect(describeQuery(query)).toEqual(
            removeIndentation(`
          "store:
              inventory: inventory.store_id = store.store_id
              address: address.address_id = store.address_id
                  city: city.city_id = address.city_id"
        `),
        );

        expect(remaining.length).toBe(1);

        expect(describeQuery(remaining[0])).toEqual(
            removeIndentation(`
          "film: film.film_id = inventory.film_id
              film_actor: film_actor.film_id = film.film_id
                  actor: actor.actor_id = film_actor.actor_id
              language: language.language_id = film.language_id"
        `),
        );
    });

    test('store split with depth', () => {
        const q = store().where({ store_id: 1 }).maybe();

        expect(describeQuery(q)).toEqual(
            removeIndentation(`
          "store:
              inventory: inventory.store_id = store.store_id
                  film: film.film_id = inventory.film_id
                      film_actor: film_actor.film_id = film.film_id
                          actor: actor.actor_id = film_actor.actor_id
                      language: language.language_id = film.language_id
              address: address.address_id = store.address_id
                  city: city.city_id = address.city_id"
        `),
        );

        const { query, remaining } = splitQueryAtBoundary<AnyQuery>(
            q,
            (q, { depth }) => q.from === 'public.film' || depth >= 4,
        );

        expect(describeQuery(query)).toEqual(
            removeIndentation(`
          "store:
              inventory: inventory.store_id = store.store_id
              address: address.address_id = store.address_id
                  city: city.city_id = address.city_id"
        `),
        );

        expect(describeQuery(remaining[0])).toEqual(
            removeIndentation(`
          "film: film.film_id = inventory.film_id
              film_actor: film_actor.film_id = film.film_id
                  actor: actor.actor_id = film_actor.actor_id
              language: language.language_id = film.language_id"
        `),
        );
    });
});
