import { AnyQuery } from '../../../../types';
import { Selection } from './types';
import { SqlBuilder } from './exp';

// TODO(fhur): this is actually only supporting count(*) for now.
export class AggregationsSelection implements Selection {
    public constructor() { }

    static fromQuery(
        rootQuery: AnyQuery,
        defaultSchema: string,
    ): AggregationsSelection[] {
        if (rootQuery.aggregates === undefined) {
            return [];
        }
        if (Object.keys(rootQuery.aggregates).length === 0) {
            return [];
        }
        return [new AggregationsSelection()]
    }

    toSql() {
        return new SqlBuilder().addAs(['as', ['fn', 'count', '1'], 'count']);
    }

    extractFromRow(row: any, target: any): void {
        // TODO assert prescence
        const tmp = row['count'];
        if (typeof tmp !== 'string') {
            throw new Error(
                `Expected count to be a string, got: ${JSON.stringify(tmp)}`,
            );
        }

        // Note technically correct, but we're not going to support counting bigints
        // this is only an issue if you return more than Integer.MAX_VALUE rows,
        // which is unlikely.
        target['count'] = parseInt(tmp);
    }
}
