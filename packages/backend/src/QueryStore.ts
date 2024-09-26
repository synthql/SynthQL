import {
    AnyQuery,
    isQueryParameter,
    iterateRecursively,
} from '@synthql/queries';
import { SynthqlError } from './SynthqlError';

export class QueryStore {
    private queries: Map<string, AnyQuery>;

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
        const query = this.queries.get(queryId);

        if (!query) {
            throw SynthqlError.createQueryNotRegisteredError({ queryId });
        }

        // Check if all required parameters are provided
        const missingParams: string[] = [];

        iterateRecursively(query, (x, _) => {
            if (isQueryParameter(x) && params[x.id] === undefined) {
                missingParams.push(x.id);
            }
        });

        if (missingParams.length > 0) {
            throw SynthqlError.createQueryParameterMissingValueError({
                params,
                paramIds: missingParams,
            });
        }

        // Apply parameters
        iterateRecursively(query, (x, _) => {
            if (isQueryParameter(x)) {
                x.value = params[x.id];
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
    set(query: AnyQuery): void {
        if (!query.hash) {
            throw SynthqlError.createQueryMissingHashError({
                query,
            });
        }

        if (this.queries.has(query.hash)) {
            throw SynthqlError.createQueryAlreadyRegisteredError({
                queryId: query.hash,
            });
        }

        this.queries.set(query.hash, query);
    }
}
