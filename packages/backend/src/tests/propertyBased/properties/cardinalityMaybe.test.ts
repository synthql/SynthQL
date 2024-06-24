import { it } from '@fast-check/vitest';
import { describe, expect } from 'vitest';
import { Query } from '@synthql/queries';
import { DB, schema } from '../../generated';
import { arbitraryQuery } from '../arbitraries/arbitraryQuery';
import { pool, queryEngine } from '../../queryEngine';
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
            const typedQuery = query as Query<DB>;

            const queryResult = await queryEngine.executeAndWait(typedQuery);

            const result = queryResult as any;

            expect(result).toBeTypeOf('object');

            expect(Array.isArray(result)).toEqual(false);
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should return null',
        async (query) => {
            const typedQuery = query as Query<DB>;

            const queryResult = await queryEngine.executeAndWait(typedQuery);

            const result = queryResult as any;

            expect(result).toEqual(null);
        },
    );
});
