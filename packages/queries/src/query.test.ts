import { describe, test } from 'vitest';
import { Query, QueryResult, Table, col, query } from '.';
import { DB } from './generated/db';

const from = query<DB>().from;

describe('queries', () => {
    function fakeQueryResult<TQuery extends Query<DB, Table<DB>>>(
        q: TQuery,
    ): QueryResult<DB, TQuery> {
        return {} as any;
    }

    test('Find one actor', () => {
        const q = from('actor').columns('actor_id', 'first_name').one();

        const result = fakeQueryResult(q);
        result satisfies { actor_id: number; first_name: string };
    });

    test('Find many actors', () => {
        const q = from('actor').columns('actor_id', 'first_name').many();

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
            .where({
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

    test('Find one actor by ID', () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({
                actor_id: 1,
            })
            .one();

        const result = fakeQueryResult(q);
        // @ts-expect-error
        result satisfies {
            actor_id: number;
            first_name: string;
            last_name: string;
            last_update: Date;
        };
    });

    test('Find one actor by ID', () => {
        const q = from('actor')
            .columns()
            .where({
                actor_id: 1,
            })
            .one();

        const result = fakeQueryResult(q);
        // @ts-expect-error
        result satisfies {
            actor_id: number;
            first_name: string;
            last_name: string;
            last_update: Date;
        };
    });

    test('Find film with language and actors', () => {
        const language = from('language')
            .columns('language_id', 'name')
            .where({ language_id: col('film.language_id') })
            .one();

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
            language: {
                language_id: number;
                name: string;
            };
            actors: Array<{
                actor_id: number;
                first_name: string;
                last_name: string;
            }>;
        };
    });
});
