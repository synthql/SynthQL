import { col } from '@synthql/queries';
import { describe, expect, it } from 'vitest';
import { PgExecutor } from '.';
import { from } from '../../../tests/generated';
import { pool } from '../../../tests/queryEngine';
import { QueryProviderExecutor } from '../QueryProviderExecutor';

describe('PgExecutor', () => {
    const executeProps = { defaultSchema: 'public' };
    const executor = new PgExecutor({
        pool,
        defaultSchema: 'public',
        qpe: new QueryProviderExecutor([]),
        prependSql: `SET search_path TO "public";`,
    });

    const q1 = from('film')
        .columns('film_id', 'title')
        .include({
            lang: from('language')
                .columns('name')
                .where({
                    language_id: col('film.language_id'),
                })
                .one(),
        })
        .where({
            film_id: { '= any': [2] },
        })
        .one();

    it('Film table SynthQL query compiles to expected SQL query', () => {
        const { sql } = executor.compile(q1);

        expect(sql).toMatchInlineSnapshot(`
          "select
            "public::film".film_id as "film_id",
            "public::film".title as "title",
            coalesce(
              jsonb_agg(distinct ("public::language")),
              ('[]')::jsonb
            ) as "lang"
          from
            "public"."film" "public::film"
            left join "public"."language" "public::language" on "public::language".language_id = "public::film".language_id
          where
            ("public::film".film_id = any ($1))
          group by
            "public::film".film_id
          limit
            1"
        `);
    });

    it('limit sql injection', () => {
        expect(() => {
            const query = from('actor')
                .limit(`1; drop table actor; --` as unknown as number)
                .all();
            executor.compile(query);
        }).toThrow('Expected limit to be a number');
    });

    it('offset sql injection', () => {
        expect(() => {
            const query = from('actor')
                .offset(`1; drop table actor; --` as unknown as number)
                .all();
            executor.compile(query);
        }).toThrow('Expected offset to be a number');
    });

    it('Film table SynthQL query executes to expected result', async () => {
        const result = await executor.execute(q1, executeProps);

        expect(result).toEqual([
            {
                film_id: 2,
                lang: {
                    name: 'English             ',
                },
                title: 'ACE GOLDFINGER',
            },
        ]);
    });

    const q2 = from('actor')
        .columns('actor_id', 'first_name', 'last_name')
        .take(2);

    it('Actor table SynthQL query executes to expected result', async () => {
        const result = await executor.execute(q2, executeProps);

        expect(result).toEqual([
            {
                actor_id: 1,
                first_name: 'PENELOPE',
                last_name: 'GUINESS',
            },
            {
                actor_id: 2,
                first_name: 'NICK',
                last_name: 'WAHLBERG',
            },
        ]);
    });

    it('single provider is null', async () => {
        const q = from('film')
            .columns('film_id', 'original_language_id', 'title', 'rating')
            .where({ original_language_id: { is: null } })
            .take(2);

        const result = await executor.execute(q, executeProps);

        expect(result).toEqual([
            {
                film_id: 1,
                original_language_id: null,
                title: 'ACADEMY DINOSAUR',
                rating: 'PG',
            },
            {
                film_id: 2,
                original_language_id: null,
                title: 'ACE GOLDFINGER',
                rating: 'G',
            },
        ]);
    });

    it('single provider is not null', async () => {
        const q = from('customer')
            .columns('customer_id', 'email', 'first_name', 'last_name')
            .where({ email: { 'is not': null } })
            .take(2);

        const result = await executor.execute(q, executeProps);

        expect(result).toEqual([
            {
                customer_id: 1,
                email: 'MARY.SMITH@sakilacustomer.org',
                first_name: 'MARY',
                last_name: 'SMITH',
            },
            {
                customer_id: 2,
                email: 'PATRICIA.JOHNSON@sakilacustomer.org',
                first_name: 'PATRICIA',
                last_name: 'JOHNSON',
            },
        ]);
    });

    const language = from('language')
        .columns('language_id', 'name')
        .where({
            language_id: col('film.original_language_id'),
        })
        .maybe();

    const filmWithIncludedColumnSelected = from('film')
        .columns('film_id', 'title', 'original_language_id')
        .include({
            original_language_id: language,
        })
        .take(2);

    const filmWithoutIncludedColumnSelected = from('film')
        .columns('film_id', 'title')
        .include({
            original_language_id: language,
        })
        .take(2);

    it('Film table level 1 `include()` SynthQL query executes to expected result', async () => {
        const resultWithIncludedColumnSelected = await executor.execute(
            filmWithIncludedColumnSelected,
            executeProps,
        );

        const resultWithoutIncludedColumnSelected = await executor.execute(
            filmWithoutIncludedColumnSelected,
            executeProps,
        );

        const rows = [
            {
                film_id: 1,
                title: 'ACADEMY DINOSAUR',
                original_language_id: null,
            },
            {
                film_id: 2,
                title: 'ACE GOLDFINGER',
                original_language_id: null,
            },
        ];

        expect(resultWithIncludedColumnSelected).toEqual(rows);
        expect(resultWithoutIncludedColumnSelected).toEqual(rows);
    });
});
