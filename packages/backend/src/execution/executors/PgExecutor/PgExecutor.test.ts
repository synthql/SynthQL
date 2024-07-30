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
        coalesce(jsonb_agg("public::language"), ('[]')::jsonb) as "lang"
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

    const q3 = from('actor')
        .columns('actor_id', 'first_name', 'last_name')
        .where({ actor_id: 1 })
        .one();

    it(`Actor table SynthQL query executes to 
        expected result with SQL to prepend included`, async () => {
        const result = await executor.execute(q3, {
            ...executeProps,
            prependSql: 'SET search_path TO public',
        });

        expect(result).toEqual([
            {
                actor_id: 1,
                first_name: 'PENELOPE',
                last_name: 'GUINESS',
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
