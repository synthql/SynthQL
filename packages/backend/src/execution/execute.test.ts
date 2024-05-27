import { col, query } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { collectLast } from '..';
import { QueryProvider } from '../QueryProvider';
import { DB, schema } from '../tests/generated';
import { PgCatalogInt4, PgCatalogText } from '../tests/generated/db';
import { execute } from './execute';
import { QueryProviderExecutor } from './executors/QueryProviderExecutor';

interface DbWithVirtualTables extends DB {
    film_rating: {
        columns: {
            film_id: {
                type: PgCatalogInt4;
                selectable: true;
                includable: false;
                whereable: true;
                nullable: false;
                isPrimaryKey: true;
            };

            rating: {
                type: PgCatalogText;
                selectable: true;
                includable: false;
                whereable: false;
                nullable: false;
                isPrimaryKey: false;
            };
        };
    };
}

const schemaWithVirtualTables = {
    properties: {
        ...schema.properties,
        film_rating: {
            properties: {
                columns: {
                    properties: {
                        film_id: {
                            properties: {
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
                            },
                        },
                        rating: {
                            properties: {
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const from = query<DbWithVirtualTables>(schemaWithVirtualTables).from;
const defaultSchema = 'public';

type ActorQueryProvider = QueryProvider<DbWithVirtualTables, 'actor'>;
type FilmQueryProvider = QueryProvider<DbWithVirtualTables, 'film'>;
type FilmRatingQueryProvider = QueryProvider<
    DbWithVirtualTables,
    'film_rating'
>;

const actorProvider: ActorQueryProvider = {
    table: 'actor',
    execute: async ({ actor_id: actorIds }) => {
        const actors = [
            { actor_id: 1, first_name: 'John', last_name: 'Doe' },
            { actor_id: 2, first_name: 'Jane', last_name: 'Doe' },
            { actor_id: 3, first_name: 'John', last_name: 'Smith' },
        ];
        if (actorIds === undefined || actorIds.length === 0) {
            return actors;
        }
        return actors.filter((a) => actorIds.includes(a.actor_id));
    },
};

const filmProvider: FilmQueryProvider = {
    table: 'film',
    execute: async ({ film_id: filmIds }) => {
        const films = [
            {
                film_id: 1,
                title: 'The Matrix',
            },
            {
                film_id: 2,
                title: 'The Matrix Reloaded',
            },
            {
                film_id: 3,
                title: 'The Matrix Revolutions',
            },
            {
                film_id: 4,
                title: 'The Fifth element',
            },
        ];

        if (filmIds === undefined || filmIds.length === 0) {
            return films;
        }

        return films.filter((f) => filmIds.includes(f.film_id));
    },
};

const filmRatingProvider: FilmRatingQueryProvider = {
    table: 'film_rating',
    execute: async ({ film_id: filmIds }) => {
        const filmRatings = [
            {
                film_id: 1,
                rating: 'PG-13',
            },
            {
                film_id: 2,
                rating: 'R',
            },
            {
                film_id: 3,
                rating: 'R',
            },
            {
                film_id: 4,
                rating: 'PG-13',
            },
        ];

        if (filmIds === undefined || filmIds.length === 0) {
            return filmRatings;
        }

        return filmRatings.filter((f) => filmIds.includes(f.film_id));
    },
};

describe('execute', () => {
    test('single provider', async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 1 })
            .one();

        const result = await collectLast(
            execute<DbWithVirtualTables, typeof q>(q, {
                executors: [new QueryProviderExecutor([actorProvider])],
                defaultSchema,
            }),
        );

        expect(result).toEqual({
            actor_id: 1,
            first_name: 'John',
            last_name: 'Doe',
        });
    });

    test('film with film_rating', async () => {
        function findFilmWithRating(filmId: number) {
            return from('film')
                .columns('film_id', 'title')
                .where({ film_id: filmId })
                .include({
                    rating: from('film_rating')
                        .columns('rating')
                        .where({ film_id: col('film.film_id') })
                        .one(),
                })
                .one();
        }

        const q = findFilmWithRating(1);

        const result = await collectLast(
            execute<DbWithVirtualTables, typeof q>(q, {
                executors: [
                    new QueryProviderExecutor([
                        filmProvider,
                        filmRatingProvider,
                    ]),
                ],
                defaultSchema,
            }),
        );

        expect(result).toMatchObject({
            film_id: 1,
            title: 'The Matrix',
            rating: {
                rating: 'PG-13',
            },
        });

        const q2 = findFilmWithRating(2);

        const result2 = await collectLast(
            execute<DbWithVirtualTables, typeof q2>(q2, {
                executors: [
                    new QueryProviderExecutor([
                        filmProvider,
                        filmRatingProvider,
                    ]),
                ],
                defaultSchema,
            }),
        );

        expect(result2).toMatchObject({
            film_id: 2,
            title: 'The Matrix Reloaded',
            rating: {
                rating: 'R',
            },
        });
    });
});
