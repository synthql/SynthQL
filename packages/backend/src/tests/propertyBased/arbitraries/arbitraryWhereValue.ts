import { fc } from '@fast-check/vitest';
import { AllTablesRowsMap } from '../getTableRowsByTableName';
import {
    Schema,
    getColumnDef,
    getColumnPgType,
    getTableDef,
} from '@synthql/queries';

export function arbitraryWhereValue<DB>({
    schema,
    allTablesRowsMap,
    tableName,
    columnName,
    validWhere,
}: {
    schema: Schema<DB>;
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
        const columnValuesFromSet = Array.from(new Set(columnValues));

        if (validWhere) {
            return fc.constantFrom(...columnValuesFromSet);
        } else {
            const tableDef = getTableDef(schema, tableName);

            const columnDef = getColumnDef(tableDef, columnName);

            const columnPgType = getColumnPgType(columnDef);

            // const columnValuesFromSet = Array.from(
            //     new Set(columnValues),
            // ).filter((item) => item !== null && item !== undefined);

            // Return an arbitrary value that matches two conditions
            // 1. It is of the type of the first column value in the column values array
            // 2. It does not exist in the column values array

            if (columnPgType === 'pg_catalog.int2') {
                return fc
                    .integer({
                        min: 1,
                        max: 32767,
                    })
                    .filter((value) => !columnValuesFromSet.includes(value));
            } else if (columnPgType === 'pg_catalog.int4') {
                return fc
                    .integer({
                        min: 1,
                        max: 2147483647,
                    })
                    .filter((value) => !columnValuesFromSet.includes(value));
            } else if (columnPgType === 'pg_catalog.int8') {
                return fc
                    .bigInt({
                        min: 2n,
                        max: 52n,
                    })
                    .filter((value) => !columnValuesFromSet.includes(value));
            } else if (columnPgType === 'pg_catalog.bool') {
                return fc
                    .boolean()
                    .filter((value) => !columnValuesFromSet.includes(value));
            } else if (columnPgType === 'pg_catalog.text') {
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
            } else if (columnPgType === 'pg_catalog.tsvector') {
                return fc
                    .string({
                        minLength: 1,
                        maxLength: 10,
                    })
                    .filter((value) => !columnValuesFromSet.includes(value));
            } else if (columnPgType === 'pg_catalog.numeric') {
                return fc
                    .stringMatching(/^[0-9]{0,131072}\.[0-9]{1,16383}$/, {
                        size: 'xsmall',
                    })
                    .filter((value) => !columnValuesFromSet.includes(value));
            } else if (columnPgType === 'pg_catalog.bytea') {
                return fc
                    .constant(
                        // Buffer.from('7468697320697320612074c3a97374', 'hex'),
                        1,
                    )
                    .filter((value) => !columnValuesFromSet.includes(value));

                // return fc
                //     .stringMatching(/^[0-9]{0,131072}\.[0-9]{1,16383}$/, {
                //         size: 'xsmall',
                //     })
                //     .filter((value) => !columnValuesFromSet.includes(value));
            } else if (columnPgType === 'pg_catalog.bpchar') {
                return fc
                    .string({
                        minLength: 1,
                        maxLength: 19,
                    })
                    .filter((value) => !columnValuesFromSet.includes(value));
            } else {
                console.log(0, tableName, columnName, columnPgType);
                console.log(
                    1,
                    typeof columnValuesFromSet[0],
                    columnValuesFromSet[0],
                );
                return fc.constant(undefined);
            }
        }
    } else {
        return fc.constant(undefined);
    }
}
