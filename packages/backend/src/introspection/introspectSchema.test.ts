import { describe, expect, test } from 'vitest';
import { QueryEngine } from '..';
import { PgSchema, introspectSchema } from './introspectSchema';
import { queryEngine } from '../tests/queryEngine';

describe('introspectSchema', () => {
    const schema = introspectSchema(
        queryEngine as any as QueryEngine<PgSchema>,
        {
            schemas: ['public'],
        },
    );

    test('enums', async () => {
        const { enums } = await schema;

        expect(enums).toEqual([
            {
                name: 'mpaa_rating',
                values: ['NC-17', 'R', 'PG-13', 'PG', 'G'],
            },
        ]);
    });

    test('actors table', async () => {
        const { tables } = await schema;

        const table = tables.find((t) => t.name === 'public.film');

        expect(table).toEqual({
            columns: {
                description: {
                    name: 'description',
                    nullable: true,
                    type: {
                        name: 'text',
                        schema: 'pg_catalog',
                    },
                },
                film_id: {
                    name: 'film_id',
                    nullable: false,
                    type: {
                        name: 'int4',
                        schema: 'pg_catalog',
                    },
                },
                fulltext: {
                    name: 'fulltext',
                    nullable: false,
                    type: {
                        name: 'tsvector',
                        schema: 'pg_catalog',
                    },
                },
                language_id: {
                    name: 'language_id',
                    nullable: false,
                    type: {
                        name: 'int4',
                        schema: 'pg_catalog',
                    },
                },
                last_update: {
                    name: 'last_update',
                    nullable: false,
                    type: {
                        name: 'timestamptz',
                        schema: 'pg_catalog',
                    },
                },
                length: {
                    name: 'length',
                    nullable: true,
                    type: {
                        name: 'int2',
                        schema: 'pg_catalog',
                    },
                },
                original_language_id: {
                    name: 'original_language_id',
                    nullable: true,
                    type: {
                        name: 'int4',
                        schema: 'pg_catalog',
                    },
                },
                rating: {
                    name: 'rating',
                    nullable: true,
                    type: {
                        name: 'mpaa_rating',
                        schema: 'public',
                    },
                },
                release_year: {
                    name: 'release_year',
                    nullable: true,
                    type: {
                        name: 'int4',
                        schema: 'pg_catalog',
                    },
                },
                rental_duration: {
                    name: 'rental_duration',
                    nullable: false,
                    type: {
                        name: 'int2',
                        schema: 'pg_catalog',
                    },
                },
                rental_rate: {
                    name: 'rental_rate',
                    nullable: false,
                    type: {
                        name: 'numeric',
                        schema: 'pg_catalog',
                    },
                },
                replacement_cost: {
                    name: 'replacement_cost',
                    nullable: false,
                    type: {
                        name: 'numeric',
                        schema: 'pg_catalog',
                    },
                },
                special_features: {
                    name: 'special_features',
                    nullable: true,
                    type: {
                        name: '_text',
                        schema: 'pg_catalog',
                    },
                },
                title: {
                    name: 'title',
                    nullable: false,
                    type: {
                        name: 'text',
                        schema: 'pg_catalog',
                    },
                },
            },
            name: 'public.film',
            primaryKey: ['film_id'],
        });
    });

    test('actor_film table', async () => {
        const { tables } = await schema;

        const table = tables.find((t) => t.name === 'public.film_actor');

        expect(table).toEqual({
            columns: {
                actor_id: {
                    name: 'actor_id',
                    nullable: false,
                    type: {
                        name: 'int4',
                        schema: 'pg_catalog',
                    },
                },
                film_id: {
                    name: 'film_id',
                    nullable: false,
                    type: {
                        name: 'int4',
                        schema: 'pg_catalog',
                    },
                },
                last_update: {
                    name: 'last_update',
                    nullable: false,
                    type: {
                        name: 'timestamptz',
                        schema: 'pg_catalog',
                    },
                },
            },
            name: 'public.film_actor',
            primaryKey: ['film_id', 'actor_id'],
        });
    });

    test('all known types', async () => {
        const { tables } = await schema;

        const allTypes = tables
            .map((table) => table.columns)
            .flatMap((columns) => Object.values(columns))
            .map((col) => `${col.type.schema}.${col.type.name}`);

        const uniques = [...new Set(allTypes)].sort();
        expect(uniques).toEqual([
            'pg_catalog._text',
            'pg_catalog.bool',
            'pg_catalog.bpchar',
            'pg_catalog.bytea',
            'pg_catalog.date',
            'pg_catalog.int2',
            'pg_catalog.int4',
            'pg_catalog.numeric',
            'pg_catalog.text',
            'pg_catalog.timestamptz',
            'pg_catalog.tsvector',
            'public.mpaa_rating',
        ]);
    });
});
