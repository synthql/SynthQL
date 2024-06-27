import { test } from '@fast-check/vitest';
import { ArbitraryQueryBuilder } from '../arbitraries/ArbitraryQueryBuilder';
import { queryEngine } from '../../queryEngine';
import { describe, expect } from 'vitest';

const queryBuilder = ArbitraryQueryBuilder.fromPagila();

describe('No results', () => {
    const numRuns = 1000;
    const timeout = numRuns * 10;
    const endOnFailure = true;

    test.prop([queryBuilder.withCardinality('many').withNoResults().build()], {
        verbose: true,
        numRuns,
        timeout,
        endOnFailure,
    })(
        'A query with a cardinality of many, and no results should always return an empty array',
        async (query) => {
            const queryResult = await queryEngine.executeAndWait(query);
            expect(queryResult).toEqual([]);
        },
        timeout,
    );

    test.prop([queryBuilder.withCardinality('maybe').withNoResults().build()], {
        verbose: true,
        numRuns,
        timeout,
        endOnFailure,
    })(
        'A query with a cardinality of maybe, and no results should always return null',
        async (query) => {
            const queryResult = await queryEngine.executeAndWait(query);
            expect(queryResult).toEqual(null);
        },
        timeout,
    );

    test.prop([queryBuilder.withCardinality('one').withNoResults().build()], {
        verbose: true,
        numRuns,
        timeout,
        endOnFailure,
    })(
        'A query with a cardinality of one, and no results should always throw',
        async (query) => {
            expect(
                async () => await queryEngine.executeAndWait(query),
            ).rejects.toThrow('Expected cardinality one but got none.');
        },
        timeout,
    );
});

describe('Some results', () => {
    const numRuns = 100;
    const timeout = numRuns * 100;
    const endOnFailure = true;

    test.prop(
        [queryBuilder.withCardinality('many').withSomeResults().build()],
        {
            verbose: true,
            numRuns,
            timeout,
            endOnFailure,
        },
    )(
        'A query with a cardinality of many, and some results should always return a non-empty array',
        async (query) => {
            const queryResult = (await queryEngine.executeAndWait(
                query,
            )) as Array<any>;
            expect(queryResult.length).toBeLessThanOrEqual(Number(query.limit));
            expect(queryResult.length).toBeGreaterThan(0);

            const expectedColumns = Object.entries(query.select).flatMap(
                ([column, select]) => (select ? [column] : []),
            );
            for (const item of queryResult) {
                expect(Object.keys(item)).containSubset(expectedColumns);
            }
        },
        timeout,
    );

    test.prop(
        [
            queryBuilder
                .withCardinality('one', 'maybe')
                .withSomeResults()
                .build(),
        ],
        {
            verbose: true,
            numRuns,
            timeout,
            endOnFailure,
        },
    )(
        'A query with a cardinality of one|maybe, and some results should always return object',
        async (query) => {
            const queryResult = await queryEngine.executeAndWait(query);
            expect(Array.isArray(queryResult)).toEqual(false);
            expect(queryResult).not.toEqual(null);

            const expectedColumns = Object.entries(query.select).flatMap(
                ([column, select]) => (select ? [column] : []),
            );

            expect(Object.keys(queryResult)).containSubset(expectedColumns);
        },
        timeout,
    );
});
