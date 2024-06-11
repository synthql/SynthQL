import { col } from '@synthql/queries';
import { describe, expect, it } from 'vitest';
import { PgExecutor } from '.';
import { from } from '../../../tests/generated';
import { pool } from '../../../tests/queryEngine';
import { QueryProviderExecutor } from '../QueryProviderExecutor';

describe('PgExecutor', () => {
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

    it('compiles', () => {
        const { sql, params } = executor.compile(q1);

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

    it('should', async () => {
        const result = await executor.execute(q1);

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
        .limit(2)
        .many();

    it('should', async () => {
        const result = await executor.execute(q2);

        expect(result.length).toBe(2);

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
});
