import { fc } from '@fast-check/vitest';
import { Schema, Where, getTableWhereableColumns } from '@synthql/queries';
import { AnyDb } from '../../../types';
import { arbitraryWhereValue } from './arbitraryWhereValue';
import { checkIfTimestampzColumn } from '../checkIfTimestampzColumn';
import { AllTablesRowsMap } from '../getTableRowsByTableName';

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
        .filter(
            (value) =>
                // TODO: We should remove this check once we resolve the `timestampz` issue
                // When there's a mismatch between the timezone of the data stored in the
                // database and the timezone of the machine that is running the database,
                // the value returned from the database is adjusted to match the timezone
                // of the server. But this means when we try to find rows matching the data
                // received, we don't get the matching rows returned. So for now, we're using
                // the logic below to exempt columns that of the timestampz type from being
                // used in this property test

                !checkIfTimestampzColumn({
                    schema,
                    table: tableName,
                    column: value,
                }),
        )
        .chain((columnName) => {
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
        });
}
