import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { beforeAll, describe, expect } from 'vitest';
import {
    generateEmptyQueryArbitrary,
    generateQueryArbitrary,
} from '../arbitraries/cardinality';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getTableValues } from './executeQuery';

describe('cardinalityMaybe', () => {
    let allValuesMap = new Map<string, Array<any>>();

    beforeAll(async () => {
        allValuesMap = await getTableValues(pool, schema);
    });

    const qa = generateQueryArbitrary(schema, allValuesMap, 'maybe');

    const eqa = generateEmptyQueryArbitrary(schema, 'maybe');

    it.prop([qa], { verbose: 2 })(
        'Valid query should return a possibly null, non-array, TS object result',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toBeTypeOf('object');

            expect(Array.isArray(queryResult)).toEqual(false);
        },
    );

    it.prop([eqa], { verbose: 2 })(
        'Empty query should return empty object',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toEqual({});
        },
    );
});
