import { fc } from '@fast-check/vitest';
import { AnyDB, Schema, Where } from '@synthql/queries';
import { arbitraryWhereValue } from './arbitraryWhereValue';
import { AllTablesRowsMap } from '../getTableRowsByTableName';
import { getTableWhereableColumns } from '../getTableWhereableColumns';

export function arbitraryWhere<DB>({
    schema,
    allTablesRowsMap,
    tableName,
    validWhere,
    parameterize,
}: {
    schema: Schema<DB>;
    allTablesRowsMap: AllTablesRowsMap;
    tableName: string;
    validWhere: boolean;
    parameterize: boolean;
}): fc.Arbitrary<Where<AnyDB, string>> {
    return fc
        .constantFrom(...getTableWhereableColumns(schema, tableName))
        .chain((columnName) => {
            return fc.dictionary(
                fc.constant(columnName),
                arbitraryWhereValue<DB>({
                    schema,
                    allTablesRowsMap,
                    tableName,
                    columnName,
                    validWhere,
                    parameterize,
                }),
                {
                    depthIdentifier: '0',
                    minKeys: 1,
                    maxKeys: 1,
                },
            );
        });
}
