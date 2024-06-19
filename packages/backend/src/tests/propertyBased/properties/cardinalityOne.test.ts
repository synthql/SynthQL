import { it } from '@fast-check/vitest';
import { DB, schema } from '../../generated';
import { describe, expect } from 'vitest';
import {
    generateQueryArbitrary,
    generateFromAndCardinalityOnlyQueryArbitrary,
} from '../arbitraries/cardinality';
import { pool, queryEngine } from '../../queryEngine';
import { executeQuery, getTableValues } from './executeQuery';
import { error } from 'console';
import { CardinalityError } from '../../../query/applyCardinality';

describe('cardinalityOne', async () => {
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
            try {
                await executeQuery<DB>(queryEngine, query);
            } catch (error) {
                expect(error).toBeInstanceOf(CardinalityError);
            }
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
