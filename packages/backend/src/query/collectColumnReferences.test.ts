import { describe, expect, test } from 'vitest';
import { from } from '../tests/generated.schema';
import { collectColumnReferences } from './collectColumnReferences';
import { AnyQuery } from '../types';
import { col } from '@synthql/queries';

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
            ];

        test.each(cases)(
            'collectColumnReferences #%#',
            async ({ query, expected }) => {
                const refs = collectColumnReferences(query, 'public');
                expect(
                    refs.map((ref) => {
                        return [
                            ref.tableRef.schema,
                            ref.tableRef.table,
                            ref.column,
                        ].join('.');
                    }),
                ).toEqual(expected);
            },
        );
    });
});
