import { QueryBuilderError } from '../QueryBuilderError';
import { AnyQuery } from '../types/AnyQuery';
import { isRefOp } from './isRefOp';

/**
 Validate that every included sub-query has at least one RefOp
 */
export function validateNestedQueriesHaveAValidRefOp(
    query: Omit<AnyQuery, 'schema'>,
) {
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
