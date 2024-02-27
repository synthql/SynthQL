import { col } from "@synthql/queries";
import { describe, expect, it } from "vitest";
import { KyselyExecutor } from ".";
import { from } from "../../../tests/generated.schema";
import { pool } from "../../../tests/queryEngine";
import { createRefContext } from "../../resolveReferences";
import { QueryProviderExecutor } from "../QueryProviderExecutor";
import { collectReferences } from "../../collectReferences";

describe('KyselyExecutor', () => {
  const executor = new KyselyExecutor(pool, 'public', new QueryProviderExecutor([]));

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


    const refContext = createRefContext();
    collectReferences(q).forEach(ref => refContext.addValues(ref));
    const result = await executor.execute(q, { refContext });



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
    expect(refContext.getValues(col('public.film.language_id'))).toEqual([1]);
  })


})