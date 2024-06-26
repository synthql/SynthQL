import { it } from '@fast-check/vitest';
import { describe, expect } from 'vitest';
import { Query } from '@synthql/queries';
import { DB, schema } from '../../generated';
import { arbitraryQuery } from '../arbitraries/arbitraryQuery';
import { pool, queryEngine } from '../../queryEngine';
import { CardinalityError } from '../../../query/applyCardinality';
import { getTableRowsByTableName } from '../getTableRowsByTableName';

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

            for (const column of Object.keys(query.select)) {
                expect(Object.keys(result)).toContain(column);
            }
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should throw error',
        async (query) => {
            try {
                const typedQuery = query as Query<DB>;
                await queryEngine.executeAndWait(typedQuery);
            } catch (error) {
                expect(error).toBeInstanceOf(CardinalityError);
            }
        },
    );
});
