import { describe, expect, test } from 'vitest';
import { DeferredResult, Query, QueryResult, Table, col } from '.';
import { DB, from } from './generated';

describe('queries', () => {
    function fakeQueryResult<TQuery extends Query<DB, Table<DB>>>(
        q: TQuery,
    ): QueryResult<DB, TQuery> {
        return {} as any;
    }

    test('Find one actor with `name()`', () => {
        const q = from('actor')
            .columns('actor_id', 'first_name')
            .name('findActor')
            .one();

        const result = fakeQueryResult(q);

        result satisfies { actor_id: number; first_name: string };
    });

    test('Find one actor with `columns()`', () => {
        const q = from('actor').columns('actor_id', 'first_name').one();

        const result = fakeQueryResult(q);

        result satisfies { actor_id: number; first_name: string };
    });

    test('Find one actor with `select()`', () => {
        const q = from('actor')
            .select({
                actor_id: true,
                first_name: true,
            })
            .one();

        const result = fakeQueryResult(q);

        result satisfies { actor_id: number; first_name: string };
    });

    test('Find one actor with automatic select of all selectable columns', () => {
        const q = from('actor').one();

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

        const result = fakeQueryResult(q);
        result satisfies Array<{ actor_id: number; first_name: string }>;
    });

    test('Find many actors with `offset()`', () => {
        const q = from('actor')
            .columns('actor_id', 'first_name')
            .offset(2)
            .many();

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

        expect(q.name).toMatchInlineSnapshot(`"actor-by-actor_id"`);
    });

    test('Find film with language and actors', () => {
        const language = from('language')
            .columns('language_id', 'name')
            .where({ language_id: col('film.language_id') })
            .maybe();

        expect(language.name).toMatchInlineSnapshot(
            `"language-by-language_id"`,
        );

        const filmActor = from('film_actor')
            .select({})
            .where({ film_id: col('film.film_id') })
            .many();

        const actors = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: col('film_actor.actor_id') })
            .many();

        const q = from('film')
            .columns('film_id', 'language_id')
            .include({
                language,
                filmActor,
                actors,
            })
            .one();

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

    test('defer()', () => {
        const q = from('customer').columns('email', 'first_name').defer().all();

        const result = fakeQueryResult(q);
        result satisfies DeferredResult<
            Array<{ email: string | null; first_name: string }>
        >;
    });

    test('defer() ', () => {
        const language = from('language')
            .columns('name')
            .defer()
            .where({
                language_id: col('film.language_id'),
            })
            .first();

        const q = from('film').include({ language }).columns('title').all();

        const result = fakeQueryResult(q);
        result satisfies Array<{
            title: string;
            language: DeferredResult<{ name: string } | null>;
        }>;

        expect(q.name).toMatchInlineSnapshot(`"film-all"`);
    });
});
