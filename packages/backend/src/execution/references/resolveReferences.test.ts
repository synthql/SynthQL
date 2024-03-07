import { describe, expect, test } from "vitest";
import { createRefContext, resolveReferences } from "./resolveReferences";
import { ColumnRef } from "../executors/PgExecutor/queryBuilder/refs";
import { from } from "../../tests/generated.schema";
import { col } from "@synthql/queries";

describe('resolveReferences', () => {
    test('should resolve references', async () => {
        const columnLangId = ColumnRef.parse("public.film.language_id", 'public');
        const refContext = createRefContext();
        refContext.addValues(columnLangId, 1, 2, 3)

        const q = from('public.language')
            .columns('name')
            .where({ language_id: col('public.film.language_id') })
            .many();
        const out = resolveReferences(q, refContext, 'public');

        expect(out.where).toEqual(
            {
                "language_id": {
                    "in": [
                        1,
                        2,
                        3,
                    ],
                },
            }
        )
    })
})