import { describe } from "node:test";
import { ArbitraryQueryBuilder } from "../arbitraries/ArbitraryQueryBuilder";
import { test } from "@fast-check/vitest";
import { queryEngine } from "../../queryEngine";
import { expect } from "vitest";
import { queryHeight } from "../../util/queryHeight";
import { flattenDeferredQueryResult } from "../../util/flattenDeferredResults";

const queryBuilder = ArbitraryQueryBuilder.fromPagila();

describe('property based tests for defer', () => {
    const numRuns = 100;
    const timeout = numRuns * 20;
    const endOnFailure = true;


    test.prop([queryBuilder.withCardinality('many').withSomeResults().build()], {
        verbose: true,
        numRuns,
        timeout,
        endOnFailure,
    })(
        'A query and a defer() query return essentially the same result',
        async (query) => {
            expect(queryHeight(query)).toBe(1);
            const queryResult = await queryEngine.executeAndWait(query);

            // as a quick sanity check, make sure there are actually some results
            expect(queryResult).not.toEqual([]);

            // now another sanity check on the flattenDeferResultsRecursively
            expect(queryResult).toEqual(flattenDeferredQueryResult(query));
        },
        timeout,
    );
});

