import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { describe, expect } from 'vitest';
import {
    generateFromAndCardinalityOnlyQueryArbitrary,
    generateQueryArbitrary,
} from '../arbitraries/cardinality';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getTableValues } from './executeQuery';

describe('cardinalityMaybe', async () => {
    const validWhereQueryArbitrary = generateQueryArbitrary({
        schema,
        allValuesMap: await getTableValues(pool, schema),
        cardinality: 'maybe',
        validWhere: true,
    });

    const invalidWhereQueryArbitrary = generateQueryArbitrary({
        schema,
        allValuesMap: await getTableValues(pool, schema),
        cardinality: 'maybe',
        validWhere: false,
    });

    const fromAndCardinalityOnlyQueryArbitrary =
        generateFromAndCardinalityOnlyQueryArbitrary({
            schema,
            cardinality: 'maybe',
        });

    it.prop([validWhereQueryArbitrary], { verbose: 2 })(
        'Valid where query should return a possibly null, non-array, TS object result',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toBeTypeOf('object');

            expect(Array.isArray(queryResult)).toEqual(false);
        },
    );

    it.prop([invalidWhereQueryArbitrary], { verbose: 2 })(
        'Invalid where query should return null',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toEqual(null);
        },
    );

    it.prop([fromAndCardinalityOnlyQueryArbitrary], { verbose: 2 })(
        'From & cardinality only query should return empty object',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toEqual({});
        },
    );
});
