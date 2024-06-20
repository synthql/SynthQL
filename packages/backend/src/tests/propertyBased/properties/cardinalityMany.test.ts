import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { describe, expect } from 'vitest';
import {
    generateFromAndCardinalityArbitraryQuery,
    generateArbitraryQuery,
} from '../arbitraries/arbitraries';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getValuesByTableName } from './executeQuery';

describe('cardinalityMany', async () => {
    const validWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allValuesMap: await getValuesByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: true,
    });

    const invalidWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allValuesMap: await getValuesByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: false,
    });

    const fromAndCardinalityArbitraryQuery =
        generateFromAndCardinalityArbitraryQuery<DB>({
            schema,
            cardinality: 'many',
        });

    it.prop([validWhereArbitraryQuery], { verbose: 2 })(
        'Valid where query should return possibly empty array',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);

            expect(queryResult.length).toBeLessThanOrEqual(query.limit);
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should return empty array',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);

            expect(queryResult).toEqual([]);
        },
    );

    it.prop([fromAndCardinalityArbitraryQuery], { verbose: 2 })(
        'From & cardinality only query should return array',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);
        },
    );
});
