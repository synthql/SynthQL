import { Where } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { collectLast } from '../..';
import { execute } from '../../execution/execute';
import { QueryProviderExecutor } from '../../execution/executors/QueryProviderExecutor';
import { col, DB, from } from '../generated';
import { provideFilm } from '../provideFilm';
import { provideLanguage } from '../provideLanguage';

describe('n x 1', () => {
    describe('n(film) -> 1(language)', async () => {
        function findFilm(where: Where<DB, 'film'>) {
            const lang = from('language')
                .columns('name')
                .where({
                    language_id: col('film.language_id'),
                })
                .one();

            return from('film')
                .where(where)
                .columns('film_id', 'title')
                .include({
                    lang,
                })
                .many();
        }

        const q = findFilm({ film_id: 1 });
        const queryResult = await collectLast(
            execute(q, {
                defaultSchema: 'public',
                executors: [
                    new QueryProviderExecutor([
                        provideLanguage(),
                        provideFilm(),
                    ]),
                ],
            }),
        );

        const cases: Array<{
            where: Where<DB, 'film'>;
            expected: typeof queryResult;
        }> = [
            {
                where: { film_id: 1 },
                expected: [
                    {
                        film_id: 1,
                        lang: {
                            name: 'English',
                        },
                        title: 'The Matrix',
                    },
                ],
            },

            {
                where: { film_id: 2 },
                expected: [
                    {
                        film_id: 2,
                        lang: {
                            name: 'English',
                        },
                        title: 'The Matrix Reloaded',
                    },
                ],
            },

            {
                where: { film_id: 3 },
                expected: [
                    {
                        film_id: 3,
                        lang: {
                            name: 'English',
                        },
                        title: 'The Matrix Revolutions',
                    },
                ],
            },

            {
                where: { film_id: 4 },
                expected: [
                    {
                        film_id: 4,
                        lang: {
                            name: 'French',
                        },
                        title: 'Amelie',
                    },
                ],
            },

            {
                where: { film_id: -1234 },
                expected: [],
            },

            {
                where: { film_id: { in: [1, 2, 3, 4] } },
                expected: [
                    {
                        film_id: 1,
                        lang: {
                            name: 'English',
                        },
                        title: 'The Matrix',
                    },
                    {
                        film_id: 2,
                        lang: {
                            name: 'English',
                        },
                        title: 'The Matrix Reloaded',
                    },
                    {
                        film_id: 3,
                        lang: {
                            name: 'English',
                        },
                        title: 'The Matrix Revolutions',
                    },
                    {
                        film_id: 4,
                        lang: {
                            name: 'French',
                        },
                        title: 'Amelie',
                    },
                ],
            },

            {
                where: { film_id: { in: [] } },
                expected: [],
            },

            {
                where: {
                    film_id: { in: [4, 1] },
                },
                expected: [
                    {
                        film_id: 1,
                        lang: {
                            name: 'English',
                        },
                        title: 'The Matrix',
                    },
                    {
                        film_id: 4,
                        lang: {
                            name: 'French',
                        },
                        title: 'Amelie',
                    },
                ],
            },
        ];

        test.each(cases)('#%#', (c) => {
            expect(c.expected).toEqual(c.expected);
        });
    });
});
