import { describe, expect, test } from "vitest";
import { QueryEngine, collectLast } from "..";
import { QueryProvider } from "../QueryProvider";
import { DB, from } from "./generated.schema";
import { pool } from "./queryEngine";
import { Where, col } from "@synthql/queries";
import { execute } from "../execution/execute";
import { QueryProviderExecutor } from "../execution/executors/QueryProviderExecutor";

type Language = DB['public.language']
type Film = Pick<DB['public.film'], 'film_id' | 'title' | 'language_id'>

describe('single-joins', () => {

    test('n x 1 join', async () => {

        const provideLanguage: QueryProvider = {
            table: 'public.language',
            execute: async (q): Promise<Language[]> => {
                const langId = q.where.language_id
                console.log(q.where)
                return [{
                    language_id: 1,
                    name: 'English',
                    last_update: new Date()
                }, {
                    language_id: 2,
                    name: 'French',
                    last_update: new Date()
                }].filter(l => l.language_id === langId)
            }
        };

        const provideFilm: QueryProvider = {
            table: 'public.film',
            execute: async (q): Promise<Film[]> => {
                return [{
                    film_id: 1,
                    title: 'The Matrix',
                    language_id: 1
                },
                {
                    film_id: 2,
                    title: 'The Matrix Reloaded',
                    language_id: 1
                },
                {
                    film_id: 3,
                    title: 'The Matrix Revolutions',
                    language_id: 1
                }

                ]
            }
        };

        function findFilm(where: Where<DB, 'public.film'>) {

            const lang = from('public.language')
                .columns('name')
                .where({
                    language_id: col('public.film.language_id')
                })
                .one()

            return from('public.film')
                .where(where)
                .columns('film_id', 'title')
                .include({
                    lang
                })
                .groupingId('film_id')
                .many()

        }

        const q = findFilm({ film_id: 1 })
        const queryResult = await collectLast(execute<DB, typeof q>(q, {
            defaultSchema: 'public',
            executors: [new QueryProviderExecutor([provideLanguage, provideFilm])]
        }))
        expect(queryResult).toMatchInlineSnapshot(`
          [
            {
              "film_id": 1,
              "lang": {
                "language_id": 1,
                "last_update": 2024-03-07T12:43:10.139Z,
                "name": "English",
              },
              "language_id": 1,
              "title": "The Matrix",
            },
            {
              "film_id": 2,
              "lang": {
                "language_id": 1,
                "last_update": 2024-03-07T12:43:10.139Z,
                "name": "English",
              },
              "language_id": 1,
              "title": "The Matrix Reloaded",
            },
            {
              "film_id": 3,
              "lang": {
                "language_id": 1,
                "last_update": 2024-03-07T12:43:10.139Z,
                "name": "English",
              },
              "language_id": 1,
              "title": "The Matrix Revolutions",
            },
          ]
        `)
    })
})