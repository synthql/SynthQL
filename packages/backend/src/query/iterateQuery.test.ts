import { describe, expect, test } from 'vitest';
import { DB } from '../tests/generated';
import { iterateQuery } from './iterateQuery';
import { AnyQuery } from '../types';
import { Path } from '../execution/types';
import { query } from '@synthql/queries';

const from = query<DB>().from;

describe('iterateQuery', () => {
    const cases: Array<{
        input: AnyQuery;
        expected: Array<{
            query: AnyQuery;
            insertionPath: Path;
        }>;
    }> = [
        {
            input: from('film').many(),
            expected: [{ query: from('film').many(), insertionPath: [] }],
        },
        {
            input: from('film')
                .include({
                    lang: from('language').many(),
                })
                .many(),

            expected: [
                {
                    query: from('film')
                        .include({ lang: from('language').many() })
                        .many(),
                    insertionPath: [],
                },
                {
                    query: from('language').many(),
                    insertionPath: ['lang'],
                },
            ],
        },

        {
            input: from('film')
                .include({
                    lang: from('language').many(),
                    actors: from('actor').many(),
                })
                .many(),

            expected: [
                {
                    query: from('film')
                        .include({
                            lang: from('language').many(),
                            actors: from('actor').many(),
                        })
                        .many(),
                    insertionPath: [],
                },
                {
                    query: from('actor').many(),
                    insertionPath: ['actors'],
                },
                {
                    query: from('language').many(),
                    insertionPath: ['lang'],
                },
            ],
        },

        {
            input: from('film')
                .include({
                    lang: from('language').many(),
                    actors: from('actor')
                        .include({
                            lang: from('language').many(),
                        })
                        .many(),
                })
                .many(),

            expected: [
                {
                    query: from('film')
                        .include({
                            lang: from('language').many(),
                            actors: from('actor')
                                .include({
                                    lang: from('language').many(),
                                })
                                .many(),
                        })
                        .many(),
                    insertionPath: [],
                },
                {
                    query: from('actor')
                        .include({ lang: from('language').many() })
                        .many(),
                    insertionPath: ['actors'],
                },
                {
                    query: from('language').many(),
                    insertionPath: ['actors', 'lang'],
                },
                {
                    query: from('language').many(),
                    insertionPath: ['lang'],
                },
            ],
        },

        {
            input: {
                from: 'film',
                select: {},
                where: {
                    film_id: 1,
                },
            },
            expected: [
                {
                    query: {
                        from: 'film',
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
