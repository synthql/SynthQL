import { AnyQuery } from '../../../types';
import {
    AugmentedQuery,
    createAugmentedQuery,
} from './queryBuilder/createAugmentedQuery';
import { SqlBuilder } from './queryBuilder/exp';

export function composeQuery({
    defaultSchema,
    query,
}: {
    defaultSchema: string;
    query: AnyQuery;
}): { sqlBuilder: SqlBuilder; augmentedQuery: AugmentedQuery } {
    const augQuery: AugmentedQuery = createAugmentedQuery(query, defaultSchema);

    let sqlBuilder = new SqlBuilder()
        .select(augQuery.selection.map((s) => s.toSql()))
        .from(augQuery.rootTable)
        .leftJoins(augQuery.joins)
        .expressionFromManyWhere(augQuery.wheres)
        .groupBy(augQuery.groupingColumns)
        .offset(query.offset)
        .limit(query.limit);

    return {
        sqlBuilder,
        augmentedQuery: augQuery,
    };
}
