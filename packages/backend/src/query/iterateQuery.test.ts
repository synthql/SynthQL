import { describe, expect, test } from "vitest";
import { from } from "../tests/generated.schema";
import { iterateQuery } from "./iterateQuery";
import { AnyQuery } from "../types";
import { Path, star } from "../execution/types";

describe('iterateQuery', () => {
    const cases: Array<{
        input: AnyQuery,
        expected: Array<{
            query: AnyQuery,
            insertionPath: Path
        }>
    }> = [
            {
                input: from('public.film')
                    .many(),
                expected: [{ query: from('public.film').many(), insertionPath: [star] }]
            },
            {
                input: from('public.film')
                    .include({
                        lang: from('public.language').many()
                    }).many(),

                expected: [
                    { query: from('public.film').include({ lang: from('public.language').many() }).many(), insertionPath: [star] },
                    { query: from('public.language').many(), insertionPath: [star, 'lang', star] }
                ]
            },

            {
                input: from('public.film')
                    .include({
                        lang: from('public.language').many(),
                        actors: from('public.actor').many()
                    }).many(),

                expected: [
                    { query: from('public.film').include({ lang: from('public.language').many(), actors: from('public.actor').many() }).many(), insertionPath: [star] },
                    { query: from('public.actor').many(), insertionPath: [star, 'actors', star] },
                    { query: from('public.language').many(), insertionPath: [star, 'lang', star] },
                ]
            },

            {
                input: from('public.film')
                    .include({
                        lang: from('public.language').many(),
                        actors: from('public.actor').include({
                            lang: from('public.language').many()
                        }).many()
                    }).many(),

                expected: [
                    { query: from('public.film').include({ lang: from('public.language').many(), actors: from('public.actor').include({ lang: from('public.language').many() }).many() }).many(), insertionPath: [star] },
                    { query: from('public.actor').include({ lang: from('public.language').many() }).many(), insertionPath: [star, 'actors', star] },
                    { query: from('public.language').many(), insertionPath: [star, 'actors', star, 'lang', star] },
                    { query: from('public.language').many(), insertionPath: [star, 'lang', star] },
                ]
            },

            {
                input: {
                    from: 'public.film',
                    select: {},
                    where: {
                        film_id: 1
                    },
                },
                expected: [
                    { query: { from: 'public.film', select: {}, where: { film_id: 1 } }, insertionPath: [star] }
                ]
            }
        ];

    test.each(cases)('iterateQuery #%#', ({ input, expected }) => {
        expect(Array.from(iterateQuery(input))).toMatchObject(expected);
    })
})