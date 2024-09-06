import { AnyQuery } from '@synthql/queries';
import { mapQuery } from '../../query/mapQuery';
import { PlanningQuery } from '../types';

export function createPlanningQuery(query: AnyQuery): PlanningQuery {
    return mapQuery<PlanningQuery>(query, (q, context): PlanningQuery => {
        return {
            ...q,
            where: q.where ?? {},
            includeKey: context?.includeKey,
            parentQuery: context?.parentQuery,
            path: context.childPath,
            include: {},
        };
    });
}
