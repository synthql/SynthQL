import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { beforeAll, describe, expect } from 'vitest';
import {
    ValuesMap,
    generateFromAndCardinalityOnlyQueryArbitrary,
    generateQueryArbitrary,
} from '../arbitraries/cardinality';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getTableValues } from './executeQuery';

describe('cardinalityMany', () => {
    let allValuesMap: ValuesMap = new Map();

    beforeAll(async () => {
        allValuesMap = await getTableValues(pool, schema);
    });

    const validWhereQueryArbitrary = generateQueryArbitrary({
        schema,
        allValuesMap,
        cardinality: 'many',
        validWhere: true,
    });

    const invalidWhereQueryArbitrary = generateQueryArbitrary({
        schema,
        allValuesMap,
        cardinality: 'many',
        validWhere: false,
    });

    const fromAndCardinalityOnlyQueryArbitrary =
        generateFromAndCardinalityOnlyQueryArbitrary({
            schema,
            cardinality: 'many',
        });

    it.prop([validWhereQueryArbitrary], { verbose: 2 })(
        'Valid where query should return possibly empty array',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);

            expect(queryResult.length).toBeLessThanOrEqual(query.limit);
        },
    );

    it.prop([invalidWhereQueryArbitrary], { verbose: 2 })(
        'Invalid where query should return empty array',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);

            expect(queryResult).toEqual([]);
        },
    );

    it.prop([fromAndCardinalityOnlyQueryArbitrary], { verbose: 2 })(
        'From & cardinality only query should return array',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);
        },
    );
});
