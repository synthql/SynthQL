import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { describe, expect } from 'vitest';
import { generateArbitraryQuery } from '../arbitraries/arbitraryQuery';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getTableRowsByTableName } from './executeQuery';

describe('cardinalityMaybe', async () => {
    const validWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'maybe',
        validWhere: true,
    });

    const invalidWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'maybe',
        validWhere: false,
    });

    it.prop([validWhereArbitraryQuery], { verbose: 2 })(
        'Valid where query should return a possibly null, non-array, TS object result',
        async (query) => {
            const queryResult = await executeQuery(queryEngine, query);

            expect(queryResult).toBeTypeOf('object');

            expect(Array.isArray(queryResult)).toEqual(false);
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should return null',
        async (query) => {
            const queryResult = await executeQuery(queryEngine, query);

            expect(queryResult).toEqual(null);
        },
    );
});
