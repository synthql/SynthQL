import { fc } from '@fast-check/vitest';
import { getTableNames, Schema, Cardinality } from '@synthql/queries';
import { AnyQuery } from '../../../types';
import { arbitraryLimit } from './arbitraryLimit';
import { arbitraryCardinality } from './arbitraryCardinality';
import { AllTablesRowsMap } from '../properties/executeQuery';
import { arbitraryWhere } from './rbitraryWhere';
import { arbitraryTableName } from './arbitraryTableName';
import { arbitrarySelect } from './arbitrarySelect';

interface ArbitraryQuery<DB> {
    schema: Schema<DB>;
    allTablesRowsMap: AllTablesRowsMap;
    cardinality: Cardinality;
    validWhere: boolean;
}

export function generateArbitraryQuery<DB>({
    schema,
    allTablesRowsMap,
    cardinality,
    validWhere,
}: ArbitraryQuery<DB>): fc.Arbitrary<AnyQuery> {
    return fc.constantFrom(...getTableNames<DB>(schema)).chain((tableName) =>
        fc.record({
            from: arbitraryTableName(tableName),
            select: arbitrarySelect({ schema, tableName }),
            where: arbitraryWhere({
                schema,
                allTablesRowsMap,
                tableName,
                validWhere,
            }),
            limit: arbitraryLimit(),
            cardinality: arbitraryCardinality(cardinality),
        }),
    );
}
