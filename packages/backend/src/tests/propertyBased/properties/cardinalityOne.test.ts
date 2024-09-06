import { it } from '@fast-check/vitest';
import { describe, expect } from 'vitest';
import { Query } from '@synthql/queries';
import { DB, schema } from '../../generated';
import { pool, queryEngine } from '../../queryEngine';
import { arbitraryQuery } from '../arbitraries/arbitraryQuery';
import { getTableRowsByTableName } from '../getTableRowsByTableName';
import { SynthqlError } from '../../../SynthqlError';

describe('cardinalityOne', async () => {
    const validWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'one',
        validWhere: true,
    });

    const invalidWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'one',
        validWhere: false,
    });

    it.prop([validWhereArbitraryQuery], { verbose: 2 })(
        'Valid where query should return a non-null, non-array, TS object result',
        async (query) => {
            const typedQuery = query as Query<DB>;

            const queryResult = await queryEngine.executeAndWait(typedQuery);

            const result = queryResult as any;

            expect(result).toBeTypeOf('object');

            expect(Array.isArray(result)).toEqual(false);

            expect(result).not.toBeNull();

            const expectedKeys = Object.entries(query.select).flatMap(
                ([key, selected]) => {
                    return selected ? [key] : [];
                },
            );

            const actualKeys = Object.keys(result);

            expect(actualKeys).to.containSubset(expectedKeys);
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should throw expected cardinality error',
        async (query) => {
            try {
                const typedQuery = query as Query<DB>;
                await queryEngine.executeAndWait(typedQuery);
            } catch (error) {
                expect(error).toBeInstanceOf(SynthqlError);
            }
        },
    );
});
