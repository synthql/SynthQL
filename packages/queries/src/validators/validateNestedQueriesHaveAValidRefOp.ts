import { QueryBuilderError } from '../QueryBuilderError';
import { Query } from '../types/types';
import { isRefOp } from '../types/isRefOp';

/**
 Validate that every included sub-query has at least one RefOp
 */
export function validateNestedQueriesHaveAValidRefOp<DB>(query: Query<DB>) {
    const nestedQueries = Object.entries(query.include ?? {});

    for (const [_, nestedQuery] of nestedQueries) {
        const whereClauses = Object.entries(nestedQuery.where);

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
