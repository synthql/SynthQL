import { test } from '@fast-check/vitest';
import { ArbitraryQueryBuilder } from '../arbitraries/ArbitraryQueryBuilder';
import { queryEngine } from '../../queryEngine';
import { describe, expect } from 'vitest';
import { Query } from '@synthql/queries';
import { DB } from '../../generated';

const queryBuilder = ArbitraryQueryBuilder.fromPagila();

const numRuns = 100;
const timeout = numRuns * 1000;
const endOnFailure = true;

test.prop([queryBuilder.withCardinality('many').withNoLimit().withSomeResults().build()], {
    verbose: true,
    numRuns,
    timeout,
    endOnFailure,
    seed: 1308343585, path: "2"
})(
    'execute(query).length should equal execute(query.count()).count',
    async (query) => {
        const queryResult = (await queryEngine.executeAndWait(
            query,
        )) as Array<any>;

        const countQuery: Query<DB> = {
            ...query,
            select: {},
            aggregates: {
                count: {
                    type: 'fn',
                    fn: 'count',
                    args: [1],
                },
            },
            groupBy: [],
            cardinality: 'one',
        };

        const countResult = (await queryEngine.executeAndWait(
            countQuery,
        )) as any;

        expect(typeof countResult.count).toEqual('number');

        expect(queryResult.length).toEqual(countResult.count);
    },
    timeout,
);
