import { it } from '@fast-check/vitest';
import { describe, expect } from 'vitest';
import { Query } from '@synthql/queries';
import { DB, schema } from '../../generated';
import { arbitraryQuery } from '../arbitraries/arbitraryQuery';
import { pool, queryEngine } from '../../queryEngine';
import { getTableRowsByTableName } from '../getTableRowsByTableName';

describe('cardinalityMany', async () => {
    const validWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: true,
    });

    const invalidWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: false,
    });

    it.prop([validWhereArbitraryQuery], { verbose: 2 })(
        'Valid where query should return possibly empty array',
        async (query) => {
            const typedQuery = query as Query<DB>;

            const queryResult = await queryEngine.executeAndWait(typedQuery);

            const result = queryResult as any;

            expect(Array.isArray(result)).toEqual(true);

            expect(result.length).toBeLessThanOrEqual(Number(query.limit));
        },
    );

    it.skip.prop([invalidWhereArbitraryQuery], { verbose: 2 })(
        'Invalid where query should return empty array',
        async (query) => {
            const typedQuery = query as Query<DB>;

            const queryResult = await queryEngine.executeAndWait(typedQuery);

            const result = queryResult as any;

            expect(Array.isArray(result)).toEqual(true);

            expect(result).toEqual([]);
        },
    );
});
