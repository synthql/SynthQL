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
    allValuesMap: Map<string, Array<any>>,
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
                where: fc
                    .constantFrom(
                        ...getWhereableColumnsFromGenericDbSchema(
                            schema,
                            table,
                        ),
                    )
                    .chain((column) =>
                        fc.object({
                            key: fc.constant(column),
                            values: [
                                whereValueArbitrary(
                                    allValuesMap,
                                    table,
                                    column,
                                ),
                            ],
                            maxDepth: 0,
                            maxKeys: 1,
                        }),
                    ),
                limit: fc.integer({
                    min: 1,
                }),
                cardinality: fc.constant(cardinality),
            }),
        );
}

export function generateEmptyQueryArbitrary(
    schema: AnyDbSchema,
    cardinality: Cardinality,
) {
    return fc
        .constantFrom(...getTableNamesFromGenericDbSchema(schema))
        .chain((table) =>
            fc.record({
                from: fc.constant(table),
                cardinality: fc.constant(cardinality),
            }),
        );
}

function whereValueArbitrary(
    allValuesMap: Map<string, Array<any>>,
    table: string,
    column: string,
): fc.Arbitrary<unknown> {
    const tableValues = allValuesMap.get(table);

    const columnValues = tableValues?.map((row) => {
        const value = row[column];

        return value;

        // if (value instanceof Date) {
        //     console.log(0, value);

        //     return value;
        // } else {
        //     return value;
        // }
    });

    if (columnValues && columnValues?.length > 0) {
        const columnValuesFromSet = Array.from(new Set(columnValues));

        return fc.constantFrom(...columnValuesFromSet);
    } else {
        return fc.constant(undefined);
    }
}
