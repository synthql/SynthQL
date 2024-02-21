import { describe, expect, test } from "vitest";
import { execute } from "./execute";
import { DB } from "../tests/generated.schema";
import { QueryProviderExecutor } from "./executors/QueryProviderExecutor";
import { collectLast } from "..";
import { col, query } from "@synthql/queries";
import { createExecutionPlan } from "./createExecutionPlan";

interface DbWithVirtualTables extends DB {
    'virtual.film_rating': {
        film_id: number;
        rating: string;
    }
}

const from = query<DbWithVirtualTables>().from;

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
        table: 'virtual.film_rating',
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

            return [{
                rating: 'PG-13'
            }]
        }
    }]);

    test('single provider', async () => {
        const q = from('public.actor')
            .columns('actor_id', 'first_name', 'last_name')
            .groupingId('actor_id')
            .where({ actor_id: 1 })
            .one();

        const result = await collectLast(execute<DbWithVirtualTables, 'public.actor', typeof q>(q, { executors: [actorProvider] }));
        expect(result).toMatchInlineSnapshot(`
          {
            "actor_id": 1,
            "first_name": "John",
            "last_name": "Doe",
          }
        `)
    });

    test.only('public.film with virtual.film_rating', async () => {
        function findFilmWithRating(filmId: number) {
            return from('public.film')
                .columns('film_id', 'title')
                .groupingId('film_id')
                .where({ film_id: filmId })
                .include({
                    rating: from('virtual.film_rating')
                        .columns('rating')
                        .where({ film_id: col('public.film.film_id') })
                        .one()
                })
                .one();
        }

        const q = findFilmWithRating(1);

        expect(createExecutionPlan(q, [filmProvider, filmRatingProvider]).root)
            .toMatchObject({
                executor: filmProvider,
                children: [{
                    executor: filmRatingProvider,
                    children: []
                }]

            })

        const result = await collectLast(execute<DbWithVirtualTables, 'public.film', typeof q>(q, { executors: [filmProvider, filmRatingProvider] }));
        expect(result).toEqual({
            film_id: 1,
            title: 'The Matrix',
            rating: {
                rating: 'PG-13'
            }
        })

        const q2 = findFilmWithRating(2);
        const result2 = await collectLast(execute<DbWithVirtualTables, 'public.film', typeof q2>(q2, { executors: [filmProvider, filmRatingProvider] }));
        expect(result2).toEqual({
            film_id: 2,
            title: 'The Matrix Reloaded',
            rating: {
                rating: 'R'
            }
        })
    })





})