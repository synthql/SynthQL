import { fc } from '@fast-check/vitest';
import { AllTablesRowsMap } from '../properties/executeQuery';
import { arbitraryWhereValue } from './arbitraryWhereValue';
import { Schema, Where, getTableWhereableColumns } from '@synthql/queries';
import { AnyDb } from '../../../types';

export function arbitraryWhere<DB>({
    schema,
    allTablesRowsMap,
    tableName,
    validWhere,
}: {
    schema: Schema<DB>;
    allTablesRowsMap: AllTablesRowsMap;
    tableName: string;
    validWhere: boolean;
}): fc.Arbitrary<Where<AnyDb, string>> {
    return fc
        .constantFrom(...getTableWhereableColumns(schema, tableName))
        .chain((columnName) => {
            // TODO: We should remove this check once we resolve the `timestampz` issue
            if (
                checkIfTimestampzColumn({
                    allTablesRowsMap,
                    tableName,
                    columnName,
                })
            ) {
                return arbitraryWhere({
                    schema,
                    allTablesRowsMap,
                    tableName,
                    validWhere,
                });
            } else {
                return fc.dictionary(
                    fc.constant(columnName),
                    arbitraryWhereValue({
                        allTablesRowsMap,
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
    allTablesRowsMap,
    tableName,
    columnName,
}: {
    allTablesRowsMap: AllTablesRowsMap;
    tableName: string;
    columnName: string;
}): boolean {
    const tableRows = allTablesRowsMap.get(tableName);

    const columnValues = tableRows?.map((row) => {
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
