import { QueryBuilderError } from '../QueryBuilderError';
import { Query } from '../types/types';
import { isRefOp } from '../types/isRefOp';

/**
 Validate that every included sub-query has at least one RefOp
 */
export function validateNestedQueriesHaveAValidRefOp<DB>(query: Query<DB>) {
    const nestedQueries = Object.values(query.include ?? {});

    for (const nestedQuery of nestedQueries) {
        const whereClauses = Object.values(nestedQuery.where);

        if (!whereClauses.some((whereClause) => isRefOp(whereClause))) {
            throw QueryBuilderError.createNestedQueryMissingRefOpWhereClauseError(
                {
                    query,
                    nestedQuery,
                },
            );
        }
    }
}
