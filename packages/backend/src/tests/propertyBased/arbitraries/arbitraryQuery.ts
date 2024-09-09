import { fc } from '@fast-check/vitest';
import { AnyQuery, Cardinality, Schema } from '@synthql/queries';
import { arbitraryLimit } from './arbitraryLimit';
import { arbitraryCardinality } from './arbitraryCardinality';
import { arbitraryWhere } from './arbitraryWhere';
import { arbitrarySelect } from './arbitrarySelect';
import { AllTablesRowsMap } from '../getTableRowsByTableName';
import { getTableNames } from '../getTableNames';
import { tablesToSkip } from '../tablesToSkip';

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
        .chain((tableName) =>
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
            }),
        );
}
