import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { beforeAll, describe, expect } from 'vitest';
import {
    ValuesMap,
    generateQueryArbitrary,
    generateFromAndCardinalityOnlyQueryArbitrary,
} from '../arbitraries/cardinality';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getTableValues } from './executeQuery';

describe('cardinalityOne', async () => {
    // let allValuesMapForValidWhere: ValuesMap = new Map();
    // let allValuesMapForInvalidWhere: ValuesMap = new Map();

    // beforeAll(async () => {
    //     allValuesMapForValidWhere = await getTableValues(pool, schema);
    //     allValuesMapForInvalidWhere = await getTableValues(pool, schema);
    // });

    const validWhereQueryArbitrary = generateQueryArbitrary({
        schema,
        allValuesMap: await getTableValues(pool, schema),
        cardinality: 'one',
        validWhere: true,
    });

    const invalidWhereQueryArbitrary = generateQueryArbitrary({
        schema,
        allValuesMap: await getTableValues(pool, schema),
        cardinality: 'one',
        validWhere: false,
    });

    const fromAndCardinalityOnlyQueryArbitrary =
        generateFromAndCardinalityOnlyQueryArbitrary({
            schema,
            cardinality: 'one',
        });

    it.prop([validWhereQueryArbitrary], { verbose: 2 })(
        'Valid where query should return a non-null, non-array, TS object result',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toBeTypeOf('object');

            expect(Array.isArray(queryResult)).toEqual(false);

            expect(queryResult).not.toBeNull();
        },
    );

    it.prop([invalidWhereQueryArbitrary], { verbose: 2 })(
        'Invalid where query should throw error',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(
                async () => await executeQuery<DB>(queryEngine, query),
            ).toThrow();
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
