
import { AugmentedQuery } from '../../../types';

export function* iterateAugmentedQuery(
    query: AugmentedQuery,
): Generator<AugmentedQuery> {
    yield query;
    for (const nested of query.children) {
        yield* iterateAugmentedQuery(nested);
    }
}
