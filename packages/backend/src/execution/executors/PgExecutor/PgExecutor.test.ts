import { col } from "@synthql/queries";
import { describe, expect, it } from "vitest";
import { PgExecutor } from ".";
import { from } from "../../../tests/generated.schema";
import { pool } from "../../../tests/queryEngine";
import { createRefContext } from "../../../refs/RefContext";
import { QueryProviderExecutor } from "../QueryProviderExecutor";
import { collectColumnReferences } from "../../../query/collectColumnReferences";

describe('PgExecutor', () => {
  const executor = new PgExecutor(pool, 'public', new QueryProviderExecutor([]));

  const q = from('public.film')
    .columns('film_id', 'title')
    .include({
      lang: from('public.language')
        .columns('name')
        .where({
          language_id: col('public.film.language_id'),
        }).one()

    })
    .where({
      film_id: { '= any': [2] }
    })
    .groupingId('film_id')
    .one();

  it('compiles', () => {
    const { sql, params } = executor.compile(q);

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
    `)
  })

  it('should', async () => {
    const result = await executor.execute(q)

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "film_id": 2,
          "lang": {
            "name": "English             ",
          },
          "title": "ACE GOLDFINGER",
        },
      ]
    `)
  })


})