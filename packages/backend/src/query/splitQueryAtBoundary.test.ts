import { describe, test } from "vitest";
import { film } from "../tests/queries.v2";

describe('splitQueryAtBoundary', () => {
    test('splitQueryAtBoundary', () => {

        film().where({ film_id: 1 }).maybe()
    })
})