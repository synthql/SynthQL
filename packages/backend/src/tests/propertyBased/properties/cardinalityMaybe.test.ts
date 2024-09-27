import { it } from '@fast-check/vitest';
import { describe, expect } from 'vitest';
import { DB, schema } from '../../generated';
import { pool, queryEngine } from '../../queryEngine';
import { arbitraryQuery } from '../arbitraries/arbitraryQuery';
import { getTableRowsByTableName } from '../getTableRowsByTableName';

describe('cardinalityMaybe', async () => {
    const validWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'maybe',
        validWhere: true,
    });

    const invalidWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'maybe',
        validWhere: false,
    });

    it.prop([validWhereArbitraryQuery], { verbose: 2 })(
        'Valid where query should return a possibly null, non-array, TS object result',
        async (query) => {
            const typedQuery = query;

            const queryResult = await queryEngine.executeAndWait(typedQuery);

            const result = queryResult as any;

            expect(result).toBeTypeOf('object');

            expect(Array.isArray(result)).toEqual(false);

            const expectedKeys = Object.entries(query.select).flatMap(
                ([key, selected]) => {
                    return selected ? [key] : [];
                },
            );

            const actualKeys = Object.keys(result);

            expect(actualKeys).to.containSubset(expectedKeys);
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should return null',
        async (query) => {
            const typedQuery = query;

            const queryResult = await queryEngine.executeAndWait(typedQuery);

            const result = queryResult as any;

            expect(result).toEqual(null);
        },
    );
});
