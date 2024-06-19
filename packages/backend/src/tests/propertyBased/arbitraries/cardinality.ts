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
        .chain((columnName): fc.Arbitrary<unknown> => {
            if (
                checkIfTimestampzColumn({ allValuesMap, tableName, columnName })
            ) {
                return whereArbitrary({
                    schema,
                    allValuesMap,
                    tableName,
                    validWhere,
                });
            } else {
                return fc.dictionary(
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
                );
            }
        });
}

function checkIfTimestampzColumn({
    allValuesMap,
    tableName,
    columnName,
}: {
    allValuesMap: ValuesMap;
    tableName: TableName;
    columnName: ColumnName;
}) {
    const tableValues = allValuesMap.get(tableName);

    const columnValues = tableValues?.map((row) => {
        const value = row[columnName];

        if (value instanceof Date) {
            return true;
        } else {
            return false;
        }
    });

    if (columnValues?.includes(true)) {
        return true;
    } else {
        return false;
    }
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
            const columnValuesFromSet = Array.from(
                new Set(columnValues),
            ).filter((item) => item !== null && item !== undefined);

            // Return an arbitrary value that matches two conditions
            // 1. It is of the type of the first column value in the column values array
            // 2. It does not exist in the column values array

            const firstColumnValue = columnValuesFromSet[0];

            if (typeof firstColumnValue === 'number') {
                return fc
                    .integer({
                        min: 1,
                        max: 32767,
                    })
                    .filter((value) => !columnValuesFromSet.includes(value));
            } else if (typeof firstColumnValue === 'string') {
                return fc
                    .string({
                        minLength: 1,
                        maxLength: 10,
                    })
                    .filter(
                        (value) =>
                            !columnValuesFromSet.includes(value) &&
                            !value.includes(' '),
                    );
            } else if (typeof firstColumnValue === 'boolean') {
                return fc
                    .boolean()
                    .filter((value) => !columnValuesFromSet.includes(value));
            } else if (typeof firstColumnValue === 'bigint') {
                return fc
                    .bigInt({
                        min: 2n,
                        max: 52n,
                    })
                    .filter((value) => !columnValuesFromSet.includes(value));
            } else if (typeof firstColumnValue === 'undefined') {
                return fc
                    .string({
                        minLength: 1,
                        maxLength: 5,
                    })
                    .filter(
                        (value) =>
                            !columnValuesFromSet.includes(value) &&
                            !value.includes(' '),
                    );
            } else {
                return fc.constant(undefined);
            }
        }
    } else {
        return fc.constant(undefined);
    }
}

function limitArbitrary() {
    return fc.integer({
        min: 1,
        max: 32767,
    });
}

function cardinalityArbitrary(cardinality: Cardinality) {
    return fc.constant(cardinality);
}
