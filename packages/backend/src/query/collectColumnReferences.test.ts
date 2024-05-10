import { QueryResult, col, query } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { DB } from '../tests/generated';
import { city, film } from '../tests/queries.v2';
import { AnyQuery } from '../types';
import { collectColumnReferences } from './collectColumnReferences';
import { printPath } from '../util/path/printPath';
import { getIn } from '../util/tree/getIn';

const from = query<DB>().from;

describe('collectColumnReferences', () => {
    describe('collectColumnReferences', () => {
        const cases: Array<{
            query: AnyQuery;
            expected: Array<string>;
        }> = [
            {
                query: from('actor').where({ actor_id: 1 }).many(),
                expected: ['actor.actor_id'],
            },

            {
                query: from('actor')
                    .where({
                        actor_id: 1,
                        first_name: col('country.country_id'),
                    })
                    .many(),
                expected: [
                    'actor.actor_id',
                    'actor.first_name',
                    'country.country_id',
                ],
            },

            {
                query: from('actor')
                    .where({
                        actor_id: 1,
                        first_name: col('country.country_id'),
                    })
                    .include({
                        foo: from('country')
                            .where({ country: col('film.film_id') })
                            .many(),
                    })
                    .many(),
                expected: [
                    'actor.actor_id',
                    'actor.first_name',
                    'country.country_id',
                    'country.country',
                    'film.film_id',
                ],
            },

            {
                query: city()
                    .where({ city_id: col('address.city_id') })
                    .many(),
                expected: ['city.city_id', 'address.city_id'],
            },
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
        const q = city()
            .where({ city_id: col('address.city_id') })
            .many();

        const queryResult: QueryResult<DB, typeof q> = [
            { city: 'Bogota', city_id: 1 },
            { city: 'Cali', city_id: 2 },
            { city: 'Medellin', city_id: 3 },
        ];

        const result = collectColumnReferences(q, 'public').map(
            ({ column }) => {
                return column.canonical();
            },
        );

        expect(result).toEqual([
            `"public"."city"."city_id"`,
            `"public"."address"."city_id"`,
        ]);
    });
});
