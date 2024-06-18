import { fc } from '@fast-check/vitest';
import {
    AnySchema,
    getSelectableColumnsFromGenericDbSchema,
    getWhereableColumnsFromGenericDbSchema,
    getTableNamesFromGenericDbSchema,
} from '@synthql/queries';

type Cardinality = 'one' | 'maybe' | 'many';

type TableName = string;

type ColumnName = string;

export type ValuesMap = Map<TableName, Array<any>>;

interface QueryArbitrary {
    schema: AnySchema;
    allValuesMap: ValuesMap;
    cardinality: Cardinality;
    validWhere: boolean;
}

export function generateQueryArbitrary({
    schema,
    allValuesMap,
    cardinality,
    validWhere,
}: QueryArbitrary) {
    return fc
        .constantFrom(...getTableNamesFromGenericDbSchema(schema))
        .chain((tableName) =>
            fc.record({
                from: tableNameArbitrary(tableName),
                select: selectArbitrary({ schema, tableName }),
                where: whereArbitrary({
                    schema,
                    allValuesMap,
                    tableName,
                    validWhere,
                }),
                limit: limitArbitrary(),
                cardinality: cardinalityArbitrary(cardinality),
            }),
        );
}

export function generateFromAndCardinalityOnlyQueryArbitrary({
    schema,
    cardinality,
}: {
    schema: AnySchema;
    cardinality: Cardinality;
}) {
    return fc
        .constantFrom(...getTableNamesFromGenericDbSchema(schema))
        .chain((table) =>
            fc.record({
                from: fc.constant(table),
                cardinality: fc.constant(cardinality),
            }),
        );
}

function tableNameArbitrary(tableName: TableName) {
    return fc.constant(tableName);
}

function selectArbitrary({
    schema,
    tableName,
}: {
    schema: AnySchema;
    tableName: TableName;
}) {
    return fc
        .constantFrom(
            getSelectableColumnsFromGenericDbSchema(schema, tableName),
        )
        .chain((keys) =>
            fc.object({
                key: fc.constantFrom(
                    ...getSelectableColumnsFromGenericDbSchema(
                        schema,
                        tableName,
                    ),
                ),
                values: [fc.boolean()],
                maxDepth: 0,
                maxKeys: keys.length,
            }),
        );
}

function whereArbitrary({
    schema,
    allValuesMap,
    tableName,
    validWhere,
}: {
    schema: AnySchema;
    allValuesMap: ValuesMap;
    tableName: TableName;
    validWhere: boolean;
}) {
    return fc
        .constantFrom(
            ...getWhereableColumnsFromGenericDbSchema(schema, tableName),
        )
        .chain((columnName) =>
            fc.dictionary(
                fc.constant(columnName),
                whereValueArbitrary({
                    allValuesMap,
                    tableName,
                    columnName,
                    validWhere,
                }),
                {
                    depthIdentifier: '0',
                    minKeys: 1,
                    maxKeys: 1,
                },
            ),
        );
}

function whereValueArbitrary({
    allValuesMap,
    tableName,
    columnName,
    validWhere,
}: {
    allValuesMap: ValuesMap;
    tableName: TableName;
    columnName: ColumnName;
    validWhere: boolean;
}): fc.Arbitrary<unknown> {
    const tableValues = allValuesMap.get(tableName);

    const columnValues = tableValues?.map((row) => {
        const value = row[columnName];

        return value;
    });

    if (columnValues && columnValues?.length > 0) {
        if (validWhere) {
            const columnValuesFromSet = Array.from(new Set(columnValues));

            return fc.constantFrom(...columnValuesFromSet);
        } else {
            // Return an `any type of value` arbitrary value that matches two conditions
            // 1. It is of the type of the first column value in the column values array
            // 2. It does not exist in the column values array

            return fc
                .anything()
                .filter(
                    (n) =>
                        typeof n === typeof columnValues[0] &&
                        !columnValues.includes(n),
                );
        }
    } else {
        return fc.constant(undefined);
    }
}

function limitArbitrary() {
    return fc.integer({
        min: 1,
    });
}

function cardinalityArbitrary(cardinality: Cardinality) {
    return fc.constant(cardinality);
}
