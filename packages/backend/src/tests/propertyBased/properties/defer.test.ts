import { describe } from 'node:test';
import { ArbitraryQueryBuilder } from '../arbitraries/ArbitraryQueryBuilder';
import { test } from '@fast-check/vitest';
import { createQueryEngine } from '../../queryEngine';
import { expect } from 'vitest';
import { queryHeight } from '../../util/queryHeight';
import { flattenDeferredQueryResult } from '../../util/flattenDeferredQueryResults';
import { Query } from '@synthql/queries';
import { DB } from '../../generated';

const queryBuilder = ArbitraryQueryBuilder.fromPagila();
const queryEngine = createQueryEngine();

describe('property based tests for defer', () => {
    const numRuns = 100;
    const timeout = numRuns * 1000;
    const endOnFailure = true;

    test.prop(
        [queryBuilder.withCardinality('many').withSomeResults().build()],
        {
            verbose: true,
            numRuns,
            endOnFailure,
        },
    )(
        [
            'A query and a deferred query return essentially the same QueryResult',
        ].join(''),
        async (query) => {
            // so far we're only generating queries of height 1
            // this is here as a reminder when we start supporting deeper queries.
            // The moment we start supporting deeper queries, this line will break,
            // but the rest of the test should still pass.
            expect(queryHeight(query)).toBe(1);
            const queryResult = await queryEngine.executeAndWait(query);

            // as a quick sanity check, make sure there are actually some results
            expect(queryResult).not.toEqual([]);

            // now another sanity check on the flattenDeferResultsRecursively
            expect(queryResult).toEqual(
                flattenDeferredQueryResult(queryResult),
            );

            const deferredQuery: Query<DB> = { ...query, lazy: true };

            const deferredQueryResult =
                await queryEngine.executeAndWait(deferredQuery);

            expect(queryResult).toEqual(
                flattenDeferredQueryResult(deferredQueryResult),
            );
        },
        timeout,
    );
});
