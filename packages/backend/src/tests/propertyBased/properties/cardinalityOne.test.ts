import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { describe, expect } from 'vitest';
import { generateArbitraryQuery } from '../arbitraries/arbitraryQuery';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getTableRowsByTableName } from './executeQuery';
import { CardinalityError } from '../../../query/applyCardinality';

describe('cardinalityOne', async () => {
    const validWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'one',
        validWhere: true,
    });

    const invalidWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'one',
        validWhere: false,
    });

    it.prop([validWhereArbitraryQuery], { verbose: 2 })(
        'Valid where query should return a non-null, non-array, TS object result',
        async (query) => {
            const queryResult = await executeQuery(queryEngine, query);

            expect(queryResult).toBeTypeOf('object');

            expect(Array.isArray(queryResult)).toEqual(false);

            expect(queryResult).not.toBeNull();
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should throw error',
        async (query) => {
            try {
                await executeQuery(queryEngine, query);
            } catch (error) {
                expect(error).toBeInstanceOf(CardinalityError);
            }
        },
    );
});
