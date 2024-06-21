import { fc } from '@fast-check/vitest';
import { AllTablesRowsMap } from '../properties/executeAndWait';

export function arbitraryWhereValue({
    allTablesRowsMap,
    tableName,
    columnName,
    validWhere,
}: {
    allTablesRowsMap: AllTablesRowsMap;
    tableName: string;
    columnName: string;
    validWhere: boolean;
}): fc.Arbitrary<unknown> {
    const tableRows = allTablesRowsMap.get(tableName);

    const columnValues = tableRows?.map((row) => {
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
