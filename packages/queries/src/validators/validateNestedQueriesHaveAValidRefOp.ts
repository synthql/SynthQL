import { QueryBuilderError } from '../QueryBuilderError';
import { Query } from '../types/types';
import { isRefOp } from '../types/isRefOp';

/**
 Here we're checking if a query that has any
 nested queries (includes), also has the
 correct RefOp where clauses for each
 */
export function validateNestedQueriesHaveAValidRefOp<DB>(query: Query<DB>) {
    const nestedQueries = Object.entries(query.include ?? {});

    for (const [_, nestedQuery] of nestedQueries) {
        const whereClauses = Object.entries(nestedQuery.where);

        // Checking for one condition here:
        // That AT LEAST 1 (ONE) of the passed
        // where clauses is a valid RefOp clause

        if (!whereClauses.some(([_, whereClause]) => isRefOp(whereClause))) {
            throw QueryBuilderError.createNestedQueryMissingRefOpWhereClauseError(
                {
                    query,
                    nestedQuery,
                },
            );
        }
    }
}
