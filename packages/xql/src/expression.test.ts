import { describe, expect, test } from 'vitest';

import {
    Exp,
    as,
    binaryOperators,
    chain,
    coalesce,
    distinct,
    isEqual,
    isFnOp,
    isPositive,
    json,
    jsonb,
    nAryOperators,
    ref as refDef,
    unaryOperators,
    when,
    compile,
    $
} from './expression';
import { DB } from './tests/db';

const ref = refDef<DB>


describe('expression', () => {
    const cases: Array<[Exp, string]> = [
        [null, 'null'],
        ['foo', "'foo'"],
        [':foo', 'foo'],
        [ref('film.film_id'), '"film"."film_id"'],
        [1, '1'],
        [true, 'true'],
        [false, 'false'],
        [['and', true, false], '(true and false)'],
        [['or', true, true, false], '(true or true or false)'],
        [['+', 1, 2], '(1 + 2)'],
        [['+', 1, 2, 3], '(1 + 2 + 3)'],
        [['-', ['+', 1, 2, 3]], '(- (1 + 2 + 3))'],
        [
            ['=', ref('film.film_id'), ['::', '123', 'numeric']],
            '("film"."film_id" = (\'123\')::numeric)',
        ],

        [
            isEqual(ref('film.film_id'), ['::', '123', 'numeric']),
            '("film"."film_id" = (\'123\')::numeric)',
        ],

        [
            chain(
                json.getAsText(':available_prices', 'stock'),
                (exp) => coalesce(exp, '0'),
                (exp) => ['::', exp, 'numeric'],
                isPositive,
            ),
            `((coalesce((available_prices ->> 'stock'), '0'))::numeric > 0)`,
        ],

        [
            isPositive(json.getAsNumeric(':available_prices', 'stock')),
            `((coalesce((available_prices ->> 'stock'), '0'))::numeric > 0)`,
        ],

        [
            chain(
                jsonb.buildObject('id', 1, 'name', 'foo'),
                distinct,
                jsonb.agg,
                (exp) => as(exp, 'foo'),
            ),
            "jsonb_agg(distinct(jsonb_build_object('id', 1, 'name', 'foo'))) as foo",
        ],

        [when(isEqual(1, 2), 2, 3), 'case when (1 = 2) then 2 else 3 end'],


        [
            {
                from: 'actors',
                select: [ref('actor.*')],
                where: isEqual(ref('actor.actor_id'), 1),
            },

            'select "actor".* from "actors" where ("actor"."actor_id" = 1)',
        ],

        [
            {
                from: 'actors',
                select: [ref('actor.*')],
                where: isEqual(ref('actor.actor_id'), $(1)),
            },

            'select "actor".* from "actors" where ("actor"."actor_id" = $1)',
        ],

        [
            {
                from: 'actors',
                select: [ref('actor.*')],
                where: isEqual(ref('actor.actor_id'), $(1)),
                joins: [
                    ['left', 'film_actor', isEqual(ref('film_actor.actor_id'), ref('actor.actor_id'))],
                ]
            },

            'select "actor".* from "actors" left join "film_actor" on ("film_actor"."actor_id" = "actor"."actor_id") where ("actor"."actor_id" = $1)',
        ],
    ];

    test.each(cases)('compile %s', (exp, expected) => {
        expect(compile(exp)).toEqual(expected);
    });
});


