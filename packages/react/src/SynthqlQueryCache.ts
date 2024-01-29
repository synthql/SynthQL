import { Query, QueryCache } from '@tanstack/react-query';
import { SynthqlQueryKey } from '.';

type QueryCacheConfig = ConstructorParameters<typeof QueryCache>[0];

export function createXqlQueryCache(opts: QueryCacheConfig) {
    return new XqlQueryCache(opts);
}



class XqlQueryCache extends QueryCache {
    add(query: Query<any, any, any, any>): void {
        super.add(query);
    }
}
