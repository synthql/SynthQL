import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { beforeAll, describe, expect } from 'vitest';
import {
    generateEmptyQueryArbitrary,
    generateQueryArbitrary,
} from '../arbitraries/cardinality';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getTableValues } from './executeQuery';

describe('cardinalityOne', () => {
    let allValuesMap = new Map<string, Array<any>>();

    beforeAll(async () => {
        allValuesMap = await getTableValues(pool, schema);
    });

    const qa = generateQueryArbitrary(schema, allValuesMap, 'one');

    const eqa = generateEmptyQueryArbitrary(schema, 'one');

    it.prop([qa], { verbose: 2 })(
        'Valid query should return a non-null, non-array, TS object result',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toBeTypeOf('object');

            expect(Array.isArray(queryResult)).toEqual(false);

            expect(queryResult).not.toBeNull();
        },
    );

    it.prop([eqa], { verbose: 2 })(
        'Empty query should throw error',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toEqual({});
        },
    );
});
