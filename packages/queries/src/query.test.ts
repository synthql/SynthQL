import { describe, test } from 'vitest';
import { AnyQuery, Query, QueryResult, col } from '.';
import { from } from './generated';

describe('queries', () => {
    function fakeQueryResult<T extends Query>(q: T): QueryResult<T> {
        return {} as any;
    }

    function testAssignableToAnyQuery(q: AnyQuery) {
        // Do nothing
    }

    function testAssignableToQuery(q: Query): Query {
        return q;
    }

    test('Find one actor with `name()`', () => {
        const q = from('actor')
            .columns('actor_id', 'first_name')
            .name('findActor')
            .one();

        testAssignableToAnyQuery(q);
        testAssignableToQuery(q);
        const result = fakeQueryResult(q);

        result satisfies { actor_id: number; first_name: string };
    });

    test('Find one actor with `columns()`', () => {
        const q = from('actor').columns('actor_id', 'first_name').one();

        testAssignableToAnyQuery(q);
        testAssignableToQuery(q);
        const result = fakeQueryResult(q);

        result satisfies { actor_id: number; first_name: string };
    });

    test('Find one actor with `select()`', () => {
        const q = from('actor').columns('actor_id', 'first_name').one();

        testAssignableToAnyQuery(q);
        testAssignableToQuery(q);
        const result = fakeQueryResult(q);

        result satisfies { actor_id: number; first_name: string };
    });

    test('Find one actor with automatic select of all selectable columns', () => {
        const q = from('actor').one();

        testAssignableToAnyQuery(q);
        testAssignableToQuery(q);
        const result = fakeQueryResult(q);

        result satisfies {
            actor_id: number;
            first_name: string;
            last_name: string;
            last_update: string;
        };
    });

    test('Find many actors', () => {
        const q = from('actor').columns('actor_id', 'first_name').many();

        testAssignableToAnyQuery(q);
        testAssignableToQuery(q);
        const result = fakeQueryResult(q);
        result satisfies Array<{ actor_id: number; first_name: string }>;
    });

    test('Find many actors with `offset()`', () => {
        const q = from('actor')
            .columns('actor_id', 'first_name')
            .offset(2)
            .many();

        testAssignableToAnyQuery(q);
        testAssignableToQuery(q);
        const result = fakeQueryResult(q);
        result satisfies Array<{ actor_id: number; first_name: string }>;
    });

    test('Find many actors with `take()`', () => {
        const q = from('actor').columns('actor_id', 'first_name').take(2);

        const result = fakeQueryResult(q);
        result satisfies Array<{ actor_id: number; first_name: string }>;
    });

    test('Find maybe actor', () => {
        const q = from('actor').columns('actor_id', 'first_name').maybe();

        const result = fakeQueryResult(q);
        result satisfies { actor_id: number; first_name: string } | null;
    });

    test('Find one actor by ID', () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name', 'last_update')
            .filter({
                actor_id: 1,
            })
            .one();

        const result = fakeQueryResult(q);

        result satisfies {
            actor_id: number;
            first_name: string;
            last_name: string;
            last_update: string;
        };
    });

    test('Find film with language and actors', () => {
        const language = from('language')
            .columns('language_id', 'name')
            .where({ language_id: col('film.language_id') })
            .maybe();

        const filmActor = from('film_actor')
            .where({ film_id: col('film.film_id') })
            .columns()
            .many();

        const actors = from('actor')
            .offset(10)
            .where({ actor_id: col('film_actor.actor_id') })
            .columns('actor_id', 'first_name', 'last_name')
            .many();

        const q = from('film')
            .columns('film_id', 'language_id')
            .include({
                language,
                filmActor,
                actors,
            })
            .one();

        testAssignableToQuery(q).schema;
        testAssignableToAnyQuery(q);

        const result = fakeQueryResult(q);

        result satisfies {
            film_id: number;
            language_id: number;
            language: {
                language_id: number;
                name: string;
            } | null;
            actors: Array<{
                actor_id: number;
                first_name: string;
                last_name: string;
            }>;
        };
    });

    test('', () => {
        const address = from('address').columns('address_id', 'city_id').one();
        const staff = from('staff')
            .columns('staff_id')
            .where({
                address_id: col('address.address_id'),
            })
            .one();

        const store = from('store')
            .columns('store_id', 'address_id')
            .columns('address_id')
            .include({
                address,
            })
            .include({
                address: from('address')
                    .columns('address2')
                    .where({
                        address_id: col('store.address_id'),
                    })
                    .many(),
            })
            .include({
                staff,
            })
            .all();

        const result = fakeQueryResult(store);
        result satisfies Array<{
            address_id: number;
            staff: {
                staff_id: number;
            };
        }>;
    });
});
