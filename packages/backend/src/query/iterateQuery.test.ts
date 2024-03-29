import { describe, expect, test } from 'vitest';
import { from } from '../tests/generated.schema';
import { iterateQuery } from './iterateQuery';
import { AnyQuery } from '../types';
import { Path } from '../execution/types';

describe('iterateQuery', () => {
    const cases: Array<{
        input: AnyQuery;
        expected: Array<{
            query: AnyQuery;
            insertionPath: Path;
        }>;
    }> = [
        {
            input: from('public.film').many(),
            expected: [
                { query: from('public.film').many(), insertionPath: [] },
            ],
        },
        {
            input: from('public.film')
                .include({
                    lang: from('public.language').many(),
                })
                .many(),

            expected: [
                {
                    query: from('public.film')
                        .include({ lang: from('public.language').many() })
                        .many(),
                    insertionPath: [],
                },
                {
                    query: from('public.language').many(),
                    insertionPath: ['lang'],
                },
            ],
        },

        {
            input: from('public.film')
                .include({
                    lang: from('public.language').many(),
                    actors: from('public.actor').many(),
                })
                .many(),

            expected: [
                {
                    query: from('public.film')
                        .include({
                            lang: from('public.language').many(),
                            actors: from('public.actor').many(),
                        })
                        .many(),
                    insertionPath: [],
                },
                {
                    query: from('public.actor').many(),
                    insertionPath: ['actors'],
                },
                {
                    query: from('public.language').many(),
                    insertionPath: ['lang'],
                },
            ],
        },

        {
            input: from('public.film')
                .include({
                    lang: from('public.language').many(),
                    actors: from('public.actor')
                        .include({
                            lang: from('public.language').many(),
                        })
                        .many(),
                })
                .many(),

            expected: [
                {
                    query: from('public.film')
                        .include({
                            lang: from('public.language').many(),
                            actors: from('public.actor')
                                .include({
                                    lang: from('public.language').many(),
                                })
                                .many(),
                        })
                        .many(),
                    insertionPath: [],
                },
                {
                    query: from('public.actor')
                        .include({ lang: from('public.language').many() })
                        .many(),
                    insertionPath: ['actors'],
                },
                {
                    query: from('public.language').many(),
                    insertionPath: ['actors', 'lang'],
                },
                {
                    query: from('public.language').many(),
                    insertionPath: ['lang'],
                },
            ],
        },

        {
            input: {
                from: 'public.film',
                select: {},
                where: {
                    film_id: 1,
                },
            },
            expected: [
                {
                    query: {
                        from: 'public.film',
                        select: {},
                        where: { film_id: 1 },
                    },
                    insertionPath: [],
                },
            ],
        },
    ];

    test.each(cases)('iterateQuery #%#', ({ input, expected }) => {
        expect(Array.from(iterateQuery(input))).toMatchObject(expected);
    });
});
