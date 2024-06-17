import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { beforeAll, describe, expect } from 'vitest';
import {
    generateEmptyQueryArbitrary,
    generateQueryArbitrary,
} from '../arbitraries/cardinality';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getTableValues } from './executeQuery';

describe('cardinalityMany', () => {
    let allValuesMap = new Map<string, Array<any>>();

    beforeAll(async () => {
        allValuesMap = await getTableValues(pool, schema);
    });

    const qa = generateQueryArbitrary(schema, allValuesMap, 'many');

    const eqa = generateEmptyQueryArbitrary(schema, 'many');

    it.prop([qa], { verbose: 2 })(
        'Valid query should return possibly empty array',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);

            expect(queryResult.length).toBeLessThanOrEqual(query.limit);
        },
    );

    it.prop([eqa], { verbose: 2 })(
        'Empty query should return empty array',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(Array.isArray(queryResult)).toEqual(true);
        },
    );
});
