import { it } from '@fast-check/vitest';
import { describe, expect } from 'vitest';
import { Query } from '@synthql/queries';
import { DB, schema } from '../../generated';
import { pool, queryEngine } from '../../queryEngine';
import { arbitraryQuery } from '../arbitraries/arbitraryQuery';
import { getTableRowsByTableName } from '../getTableRowsByTableName';

describe('cardinalityMany', async () => {
    const validWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: true,
        parameterize: false,
    });

    const validAndParameterizedWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: true,
        parameterize: true,
    });

    const invalidWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: false,
        parameterize: false,
    });

    const invalidAndParameterizedWhereArbitraryQuery = arbitraryQuery<DB>({
        schema,
        allTablesRowsMap: await getTableRowsByTableName<DB>(pool, schema),
        cardinality: 'many',
        validWhere: false,
        parameterize: true,
    });

    it.prop(
        [validWhereArbitraryQuery, validAndParameterizedWhereArbitraryQuery],
        { verbose: 2 },
    )('Valid where query should return possibly empty array', async (query) => {
        const typedQuery = query as Query<DB>;

        const queryResult = await queryEngine.executeAndWait(typedQuery);

        const result = queryResult as any;

        expect(Array.isArray(result)).toEqual(true);

        expect(result.length).toBeLessThanOrEqual(Number(query.limit));

        const expectedKeys = Object.entries(query.select).flatMap(
            ([key, selected]) => {
                return selected ? [key] : [];
            },
        );

        for (const item of result) {
            const actualKeys = Object.keys(item);

            expect(actualKeys).to.containSubset(expectedKeys);
        }
    });

    it.skip.prop(
        [
            invalidWhereArbitraryQuery,
            invalidAndParameterizedWhereArbitraryQuery,
        ],
        { verbose: 2 },
    )('Invalid where query should return empty array', async (query) => {
        const typedQuery = query as Query<DB>;

        const queryResult = await queryEngine.executeAndWait(typedQuery);

        const result = queryResult as any;

        expect(Array.isArray(result)).toEqual(true);

        expect(result).toEqual([]);
    });
});
