import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { describe, expect } from 'vitest';
import {
    generateFromAndCardinalityArbitraryQuery,
    generateArbitraryQuery,
} from '../arbitraries/arbitraries';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getValuesByTableName } from './executeQuery';

describe('cardinalityMaybe', async () => {
    const validWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allValuesMap: await getValuesByTableName<DB>(pool, schema),
        cardinality: 'maybe',
        validWhere: true,
    });

    const invalidWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allValuesMap: await getValuesByTableName<DB>(pool, schema),
        cardinality: 'maybe',
        validWhere: false,
    });

    const fromAndCardinalityArbitraryQuery =
        generateFromAndCardinalityArbitraryQuery<DB>({
            schema,
            cardinality: 'maybe',
        });

    it.prop([validWhereArbitraryQuery], { verbose: 2 })(
        'Valid where query should return a possibly null, non-array, TS object result',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toBeTypeOf('object');

            expect(Array.isArray(queryResult)).toEqual(false);
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should return null',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toEqual(null);
        },
    );

    it.prop([fromAndCardinalityArbitraryQuery], { verbose: 2 })(
        'From & cardinality only query should return empty object',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toEqual({});
        },
    );
});
