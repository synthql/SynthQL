import { fc } from '@fast-check/vitest';
import { Any } from '@sinclair/typebox';
import { AnyQuery, Cardinality, Schema } from '@synthql/queries';
import { getTableNames } from '../getTableNames';
import { AllTablesRowsMap } from '../getTableRowsByTableName';
import { tablesToSkip } from '../tablesToSkip';
import { arbitraryCardinality } from './arbitraryCardinality';
import { arbitraryLimit } from './arbitraryLimit';
import { arbitrarySelect } from './arbitrarySelect';
import { arbitraryWhere } from './arbitraryWhere';

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
    return fc
        .constantFrom(
            ...getTableNames<DB>(schema).filter(
                (table) => !tablesToSkip.includes(table),
            ),
        )
        .chain(
            (tableName): fc.Arbitrary<AnyQuery> =>
                fc.record({
                    from: fc.constant(tableName),
                    select: arbitrarySelect({ schema, tableName }),
                    where: arbitraryWhere({
                        schema,
                        allTablesRowsMap,
                        tableName,
                        validWhere,
                    }),
                    limit: arbitraryLimit(),
                    cardinality: arbitraryCardinality(cardinality),
                    schema: fc.constant(Any()),
                }),
        );
}
