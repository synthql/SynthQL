import { describe, expect, test } from "vitest";
import { execute } from "./execute";
import { DB, from } from "../tests/generated.schema";
import { QueryProviderExecutor } from "./executors/QueryProviderExecutor";
import { collectFirst } from "..";

interface DbWithVirtualTables extends DB {
    'virtual.film_rating': {
        film_id: number;
        rating: string;
    }
}

describe('execute', () => {

    const actorProvider = new QueryProviderExecutor([{
        table: 'public.actor',
        execute: async (q) => {
            const actorId = q.where?.actor_id;
            return [
                { actor_id: 1, first_name: 'John', last_name: 'Doe' },
                { actor_id: 2, first_name: 'Jane', last_name: 'Doe' },
                { actor_id: 3, first_name: 'John', last_name: 'Smith' },
            ].filter(a => actorId ? a.actor_id === actorId : true)
        }
    }]);

    const filmProvider = new QueryProviderExecutor([{
        table: 'public.film',
        execute: async (q) => {
            const films: Array<Pick<DbWithVirtualTables['public.film'], 'film_id' | 'title'>> = [{
                film_id: 1,
                title: 'The Matrix'
            }, {
                film_id: 2,
                title: 'The Matrix Reloaded'
            }, {
                film_id: 3,
                title: 'The Matrix Revolutions'
            }, {
                film_id: 4,
                title: 'The fifth element'
            }]

            const filmId = q.where?.film_id;
            return films.filter(a => filmId ? a.film_id === filmId : true)
        }
    }]);

    const filmRatingProvider = new QueryProviderExecutor([{
        table: 'public.film_rating',
        execute: async (q) => {
            const filmRatings: Array<Pick<DbWithVirtualTables['virtual.film_rating'], 'film_id' | 'rating'>> = [{
                film_id: 1,
                rating: 'PG-13'
            }, {
                film_id: 2,
                rating: 'R'
            }, {
                film_id: 3,
                rating: 'R'
            }, {
                film_id: 4,
                rating: 'PG-13'
            }]

            const filmId = q.where?.film_id;
            return filmRatings.filter(a => filmId ? a.film_id === filmId : true)
        }
    }]);

    test('single provider', async () => {
        const q = from('public.actor')
            .columns('actor_id', 'first_name', 'last_name')
            .groupingId('actor_id')
            .where({ actor_id: 1 })
            .one();

        const result = await collectFirst(execute<DbWithVirtualTables, 'public.actor', typeof q>(q, { executors: [actorProvider] }));
        expect(result).toMatchInlineSnapshot(`
          {
            "actor_id": 1,
            "first_name": "John",
            "last_name": "Doe",
          }
        `)
    });



})