import {
    AnyQuery,
    isQueryParameter,
    iterateRecursively,
} from '@synthql/queries';
import { SynthqlError } from './SynthqlError';

export type QueryFunction = (...params: unknown[]) => AnyQuery;

export class QueryStore {
    private queries: Map<string, QueryFunction>;

    constructor() {
        this.queries = new Map();
    }

    /**
     * Finds a query from the store and
     * applies the parameters to the query.
     *
     * Throws an error if the query cannot be found,
     * or if any of the parameters cannot be applied.
     */
    get({
        queryId,
        params,
    }: {
        queryId: string;
        params: Record<string, unknown>;
    }): AnyQuery {
        const queryFn = this.queries.get(queryId);

        if (!queryFn) {
            throw SynthqlError.createQueryNotRegisteredError({
                queryId,
            });
        }

        const query = queryFn();

        iterateRecursively(query, (x, _) => {
            if (isQueryParameter(x)) {
                const value = params?.[x.id];

                if (value === undefined) {
                    throw SynthqlError.createMissingValueError({
                        params,
                        paramId: x.id,
                    });
                }

                x.value = value;
            }
        });

        return query;
    }

    /**
     * Checks if a query is in the the store
     * and returns a corresponding boolean.
     */
    has(queryId: string) {
        return this.queries.has(queryId);
    }

    /**
     * Adds a parameterized query to the store.
     * Throws an error if a query with the
     * same identifier already exists.
     */
    set(queryFn: (...params: unknown[]) => AnyQuery): void {
        const query = queryFn();

        if (!query.hash) {
            throw SynthqlError.createMissingHashError({
                query,
            });
        }

        if (this.queries.has(query.hash)) {
            throw SynthqlError.createQueryAlreadyRegisteredError({
                queryId: query.hash,
            });
        }

        this.queries.set(query.hash, queryFn);
    }
}
