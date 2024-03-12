import { Query, Table, col } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { collectFirst } from '../../util/generators/collectFirst';
import { DB } from '../db';
import { sql } from '../postgres';
import { findActorById, findCityById, from, movie } from '../queries';
import { queryEngine } from '../queryEngine';
import { collectLast } from '../..';
import { createPlanningQuery } from '../../execution/planning/createPlanningQuery';
import { AnyQuery } from '../../types';

describe('select', () => {
    function run<TTable extends Table<DB>, T extends Query<DB, TTable>>(
        query: T,
    ) {
        return collectLast(queryEngine.execute(query));
    }

    const cases = 2;

    describe('select with depth of 1', () => {
        test.each(
            Array(cases)
                .fill(0)
                .map((_, i) => i + 1),
        )('select an actor by ID %s ', async (actorId) => {
            const result = await run(findActorById(actorId));

            const expected =
                await sql`SELECT * FROM actor WHERE actor_id = ${actorId}`;

            expect(result ?? undefined).toEqual(expected[0]);
        });
    });

    describe(`select with depth of 2:
        city
            one(country)
    `, () => {
        test.each(
            Array(cases)
                .fill(0)
                .map((_, i) => i),
        )('select a city with one country by ID %s ', async (cityId) => {
            const result = await run(findCityById(cityId));
            const expected = await sql`
            select
                city.*,
                jsonb_agg(co) #> '{0}' as country
            from city
            left join country co
                on co.country_id = city.country_id
            where city.city_id = ${cityId}
            group by
                city.city_id`;

            expect(result ?? undefined).toEqual(expected[0]);
        });
    });

    describe(`select with depth of 2:
        film
            one(language)
            many(actors)
    `, async () => {
        test.each(
            Array(cases)
                .fill(0)
                .map((_, i) => i),
        )(
            'select a film with one language and many actors by ID %s ',
            async (filmId) => {
                const query = movie().where({ film_id: filmId }).maybe();
                const result = await run(query);

                const expected = await sql`

            select
                f.title,
                f.description,
                f.release_year,
                jsonb_agg(l.*) #> '{0}' as language,
                jsonb_agg(actor.*) as actors
            from film f
                left join language l on f.language_id = l.language_id
                left join film_actor on film_actor.film_id = f.film_id
                left join actor on actor.actor_id = film_actor.actor_id
            where f.film_id = ${filmId}
            group by f.film_id`;

                expect(result ?? undefined).toMatchObject(expected[0]);
            },
        );
    });

    test(`select with 3 level depth:
        store
            one(address)
                one(city)
        `, async () => {
        const expected: Array<{ store_id: number }> = await sql`
            select
                s.store_id,
                jsonb_build_object(
                    'address_id', MAX(a.address_id),
                    'address', MAX(a.address),
                    'city', jsonb_build_object(
                        'city_id', MAX(c.city_id),
                        'city', MAX(c.city)
                    )
                ) as address
            from
                store s
            left join
                address a ON s.address_id = a.address_id
            left join
                city c ON a.city_id = c.city_id
            left join
                inventory i ON s.store_id = i.store_id
            left join
                film f ON i.film_id = f.film_id
            group by
                s.store_id
            order by
                s.store_id asc
            `;

        const city = from('city')
            .select({ city_id: true, city: true })
            .groupingId('city_id')
            .where({
                city_id: col('address.city_id'),
            })
            .one();

        const address = from('address')
            .select({ address_id: true, address: true, city: true })
            .groupingId('address_id')
            .where({
                address_id: col('store.address_id'),
            })
            .include({
                city,
            })
            .one();

        const query = from('store')
            .select({ store_id: true })
            .groupingId('store_id')
            .include({
                address,
            })
            .where({})
            .many();

        const result = await run(query);

        const comparator = (a: { store_id: number }, b: { store_id: number }) =>
            a.store_id - b.store_id;

        expect(Array.from(result).sort(comparator)).toMatchObject(
            Array.from(expected).sort(comparator),
        );
    });
});
