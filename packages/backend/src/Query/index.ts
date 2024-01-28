import { Query, Table } from '../types/Query';
import { isQuery } from './isQuery';
import { AugmentedQuery } from '../types';

export function* iterateQuery<
    DB,
    TTable extends Table<DB>,
    TQuery extends Query<DB, TTable>,
>(query: TQuery): Generator<Query<DB, Table<DB>>> {
    yield query;
    for (const nested of Object.values(query.include ?? {})) {
        if (isQuery<DB, Table<DB>>(nested)) {
            yield* iterateQuery(nested);
        }
    }
}

export function* iterateAugmentedQuery(
    query: AugmentedQuery,
): Generator<AugmentedQuery> {
    yield query;
    for (const nested of query.children) {
        yield* iterateAugmentedQuery(nested);
    }
}
