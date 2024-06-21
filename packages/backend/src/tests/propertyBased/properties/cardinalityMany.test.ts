import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { describe, expect } from 'vitest';
import { arbitraryQuery } from '../arbitraries/arbitraryQuery';
import { pool, queryEngine } from '../../queryEngine';
import { executeAndWait } from '../executeAndWait';
import { getTableRowsByTableName } from '../getTableRowsByTableName';
import { AnyDb, AnyQuery, AnyTable } from '../../../types';

describe('cardinalityMany', async () => {
    const validWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: true,
    });

    const invalidWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: false,
    });

    it.prop([validWhereArbitraryQuery], { verbose: 2 })(
        'Valid where query should return possibly empty array',
        async (query) => {
            const queryResult = await executeAndWait(queryEngine, query);

            // const queryResult = await queryEngine.executeAndWait(query);

            expect(Array.isArray(queryResult)).toEqual(true);

            expect(Number(queryResult.length)).toBeLessThanOrEqual(
                Number(query.limit),
            );
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should return empty array',
        async (query) => {
            const queryResult = await executeAndWait(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);

            expect(queryResult).toEqual([]);
        },
    );
});
