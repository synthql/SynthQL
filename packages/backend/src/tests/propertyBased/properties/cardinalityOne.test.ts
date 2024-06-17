import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { describe, expect } from 'vitest';
import { generateQueryArbitrary } from '../arbitraries/cardinality';
import { queryEngine } from '../../queryEngine';
import { executeQuery } from './executeQuery';

describe('cardinalityOne', () => {
    const qa = generateQueryArbitrary(schema, 'one');

    it.prop([qa], { verbose: 2 })(
        'Valid query should return a non-null, non-array, TS object result',
        async (query) => {
            const queryResult = await executeQuery<DB>(queryEngine, query);

            expect(queryResult).toBeTypeOf('object');

            expect(Array.isArray(queryResult)).toEqual(false);

            expect(queryResult).not.toBeNull();
        },
    );
});
