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

describe('cardinalityMany', async () => {
    // let allValuesMapForValidWhere: ValuesMap = new Map();
    // let allValuesMapForInvalidWhere: ValuesMap = new Map();

    // beforeAll(async () => {
    //     allValuesMapForValidWhere = await getTableValues(pool, schema);

    //     allValuesMapForInvalidWhere = await getTableValues(pool, schema);
    // });

    // console.log(0, allValuesMapForValidWhere);
    // console.log(1, allValuesMapForInvalidWhere);

    // for (const item of allValuesMapForValidWhere.keys()) {
    //     console.log(0, item);
    // }

    // for (const item of allValuesMapForInvalidWhere.keys()) {
    //     console.log(1, item);
    // }

    const validWhereQueryArbitrary = generateQueryArbitrary({
        schema,
        allValuesMap: await getTableValues(pool, schema),
        cardinality: 'many',
        validWhere: true,
    });

    const invalidWhereQueryArbitrary = generateQueryArbitrary({
        schema,
        allValuesMap: await getTableValues(pool, schema),
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
