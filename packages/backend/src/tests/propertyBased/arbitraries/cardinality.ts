import { fc } from '@fast-check/vitest';
import {
    AnyDbSchema,
    getSelectableColumnsFromGenericDbSchema,
    getWhereableColumnsFromGenericDbSchema,
    getTableNamesFromGenericDbSchema,
} from '@synthql/queries';

type Cardinality = 'one' | 'maybe' | 'many';

export function generateQueryArbitrary(
    schema: AnyDbSchema,
    cardinality: Cardinality,
) {
    return fc
        .constantFrom(...getTableNamesFromGenericDbSchema(schema))
        .chain((table) =>
            fc.record({
                from: fc.constant(table),
                select: fc
                    .constantFrom(
                        getSelectableColumnsFromGenericDbSchema(schema, table),
                    )
                    .chain((keys) =>
                        fc.object({
                            key: fc.constantFrom(
                                ...getSelectableColumnsFromGenericDbSchema(
                                    schema,
                                    table,
                                ),
                            ),
                            values: [fc.boolean()],
                            maxDepth: 0,
                            maxKeys: keys.length,
                        }),
                    ),
                // where: fc
                //     .constantFrom(
                //         ...getWhereableColumnsFromGenericDbSchema(
                //             schema,
                //             table,
                //         ),
                //     )
                //     .chain((column) =>
                //         fc.object({
                //             key: fc.constant(column),
                //             values: [
                //                 whereValueArbitrary(schema, table, column),
                //             ],
                //             maxDepth: 0,
                //             maxKeys: 1,
                //         }),
                //     ),
                where: fc.constant({}),
                limit: fc.integer({
                    min: 1,
                }),
                cardinality: fc.constant(cardinality),
            }),
        );
}

function whereValueArbitrary(
    schema: AnyDbSchema,
    table: string,
    column: string,
): fc.Arbitrary<unknown> {
    return fc.boolean();
}
