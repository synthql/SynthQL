import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { describe, expect } from 'vitest';
import { generateArbitraryQuery } from '../arbitraries/arbitraryQuery';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getTableRowsByTableName } from './executeQuery';

describe('cardinalityMany', async () => {
    const validWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: true,
    });

    const invalidWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: false,
    });

    it.prop([validWhereArbitraryQuery], { verbose: 2 })(
        'Valid where query should return possibly empty array',
        async (query) => {
            const queryResult = await executeQuery(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);

            expect(queryResult.length).toBeLessThanOrEqual(Number(query.limit));
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should return empty array',
        async (query) => {
            const queryResult = await executeQuery(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);

            expect(queryResult).toEqual([]);
        },
    );
});
