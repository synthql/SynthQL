import { fc } from '@fast-check/vitest';
import { getTableNames, Schema, Cardinality } from '@synthql/queries';
import { AnyQuery } from '../../../types';
import { arbitraryLimit } from './arbitraryLimit';
import { arbitraryCardinality } from './arbitraryCardinality';
import { arbitraryWhere } from './arbitraryWhere';
import { arbitraryTableName } from './arbitraryTableName';
import { arbitrarySelect } from './arbitrarySelect';
import { AllTablesRowsMap } from '../getTableRowsByTableName';

interface ArbitraryQuery<DB> {
    schema: Schema<DB>;
    allTablesRowsMap: AllTablesRowsMap;
    cardinality: Cardinality;
    validWhere: boolean;
}

export function arbitraryQuery<DB>({
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
