import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { describe, expect } from 'vitest';
import {
    generateFromAndCardinalityArbitraryQuery,
    generateArbitraryQuery,
} from '../arbitraries/arbitraries';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getValuesByTableName } from './executeQuery';
import { CardinalityError } from '../../../query/applyCardinality';

describe('cardinalityOne', async () => {
    const validWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allValuesMap: await getValuesByTableName<DB>(pool, schema),
        cardinality: 'one',
        validWhere: true,
    });

    const invalidWhereArbitraryQuery = generateArbitraryQuery<DB>({
        schema,
        allValuesMap: await getValuesByTableName<DB>(pool, schema),
        cardinality: 'one',
        validWhere: false,
    });

    const fromAndCardinalityArbitraryQuery =
        generateFromAndCardinalityArbitraryQuery<DB>({
            schema,
            cardinality: 'one',
        });

    it.prop([validWhereArbitraryQuery], { verbose: 2 })(
        'Valid where query should return a non-null, non-array, TS object result',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toBeTypeOf('object');

            expect(Array.isArray(queryResult)).toEqual(false);

            expect(queryResult).not.toBeNull();
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should throw error',
        async (query) => {
            try {
                await executeQuery<DB>(queryEngine, query);
            } catch (error) {
                expect(error).toBeInstanceOf(CardinalityError);
            }
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
