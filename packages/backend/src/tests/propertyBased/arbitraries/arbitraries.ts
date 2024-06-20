import { fc } from '@fast-check/vitest';
import {
    getTableSelectableColumns,
    getTableWhereableColumns,
    getTableNames,
    Schema,
} from '@synthql/queries';

type Cardinality = 'one' | 'maybe' | 'many';

export type AllDatabaseTableRowsMap = Map<string, Array<any>>;

interface QueryArbitrary<DB> {
    schema: Schema<DB>;
    allValuesMap: AllDatabaseTableRowsMap;
    cardinality: Cardinality;
    validWhere: boolean;
}

export function generateArbitraryQuery<DB>({
    schema,
    allValuesMap,
    cardinality,
    validWhere,
}: QueryArbitrary<DB>) {
    return fc.constantFrom(...getTableNames<DB>(schema)).chain((tableName) =>
        fc.record({
            from: arbitraryTableName(tableName),
            select: arbitrarySelect({ schema, tableName }),
            where: arbitraryWhere({
                schema,
                allValuesMap,
                tableName,
                validWhere,
            }),
            limit: arbitraryLimit(),
            cardinality: arbitraryCardinality(cardinality),
        }),
    );
}

export function generateFromAndCardinalityArbitraryQuery<DB>({
    schema,
    cardinality,
}: {
    schema: Schema<DB>;
    cardinality: Cardinality;
}) {
    return fc.constantFrom(...getTableNames<DB>(schema)).chain((table) =>
        fc.record({
            from: fc.constant(table),
            cardinality: fc.constant(cardinality),
        }),
    );
}

function arbitraryTableName(tableName: string): fc.Arbitrary<string> {
    return fc.constant(tableName);
}

function arbitrarySelect<DB>({
    schema,
    tableName,
}: {
    schema: Schema<DB>;
    tableName: string;
}): fc.Arbitrary<unknown> {
    return fc
        .constantFrom(getTableSelectableColumns<DB>(schema, tableName))
        .chain((keys) =>
            fc.object({
                key: fc.constantFrom(
                    ...getTableSelectableColumns(schema, tableName),
                ),
                values: [fc.boolean()],
                maxDepth: 0,
                maxKeys: keys.length,
            }),
        );
}

function arbitraryWhere<DB>({
    schema,
    allValuesMap,
    tableName,
    validWhere,
}: {
    schema: Schema<DB>;
    allValuesMap: AllDatabaseTableRowsMap;
    tableName: string;
    validWhere: boolean;
}): fc.Arbitrary<unknown> {
    return fc
        .constantFrom(...getTableWhereableColumns(schema, tableName))
        .chain((columnName): fc.Arbitrary<unknown> => {
            // TODO: We should remove this check once we resolve the `timestampz` issue
            if (
                checkIfTimestampzColumn({ allValuesMap, tableName, columnName })
            ) {
                return arbitraryWhere({
                    schema,
                    allValuesMap,
                    tableName,
                    validWhere,
                });
            } else {
                return fc.dictionary(
                    fc.constant(columnName),
                    arbitraryWhereValue({
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
    allValuesMap: AllDatabaseTableRowsMap;
    tableName: string;
    columnName: string;
}): boolean {
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

function arbitraryWhereValue({
    allValuesMap,
    tableName,
    columnName,
    validWhere,
}: {
    allValuesMap: AllDatabaseTableRowsMap;
    tableName: string;
    columnName: string;
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

function arbitraryLimit(): fc.Arbitrary<number> {
    return fc.integer({
        min: 1,
        max: 32767,
    });
}

function arbitraryCardinality(cardinality: Cardinality): fc.Arbitrary<string> {
    return fc.constant(cardinality);
}
