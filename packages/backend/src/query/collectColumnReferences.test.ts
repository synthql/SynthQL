import { QueryResult, col } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { DB, from } from '../tests/generated.schema';
import { city, film } from '../tests/queries.v2';
import { AnyQuery } from '../types';
import { collectColumnReferences } from './collectColumnReferences';
import { printPath } from '../util/path/printPath';
import { getIn } from '../util/tree/getIn';

describe('collectColumnReferences', () => {
    describe('collectColumnReferences', () => {
        const cases: Array<{
            query: AnyQuery;
            expected: Array<string>;
        }> = [
                {
                    query: from('public.actor').where({ actor_id: 1 }).many(),
                    expected: ['public.actor.actor_id'],
                },

                {
                    query: from('public.actor')
                        .where({
                            actor_id: 1,
                            first_name: col('public.country.country_id'),
                        })
                        .many(),
                    expected: [
                        'public.actor.actor_id',
                        'public.actor.first_name',
                        'public.country.country_id',
                    ],
                },

                {
                    query: from('public.actor')
                        .where({
                            actor_id: 1,
                            first_name: col('public.country.country_id'),
                        })
                        .include({
                            foo: from('public.country')
                                .where({ country: col('public.film.film_id') })
                                .many(),
                        })
                        .many(),
                    expected: [
                        'public.actor.actor_id',
                        'public.actor.first_name',
                        'public.country.country_id',
                        'public.country.country',
                        'public.film.film_id',
                    ],
                },

                {
                    query: city().where({ city_id: col('public.address.city_id') }).many(),
                    expected: [
                        'public.city.city_id',
                        'public.address.city_id',
                    ],
                }
            ];

        test.each(cases)(
            'collectColumnReferences #%#',
            async ({ query, expected }) => {
                const refs = collectColumnReferences(query, 'public');
                expect(
                    refs.map((ref) => {
                        return [
                            ref.column.tableRef.schema,
                            ref.column.tableRef.table,
                            ref.column.column,
                        ].join('.');
                    }),
                ).toEqual(expected);
            },
        );
    });

    test('paths', () => {
        const q = city().where({ city_id: col('public.address.city_id') }).many();

        const queryResult: QueryResult<DB, typeof q> = [
            { city: "Bogota", city_id: 1 },
            { city: "Cali", city_id: 2 },
            { city: "Medellin", city_id: 3 },
        ]

        const result = collectColumnReferences(q, 'public').map(({ column }) => {
            return column.canonical()
        })

        expect(result).toMatchInlineSnapshot(`
          [
            ""public"."city"."city_id"",
            ""public"."address"."city_id"",
          ]
        `)


    })
});
