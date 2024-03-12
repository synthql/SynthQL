import { mapQuery } from '../../query/mapQuery';
import { AnyQuery } from '../../types';
import { PlanningQuery } from '../types';

export function createPlanningQuery(query: AnyQuery): PlanningQuery {
    return mapQuery<PlanningQuery>(query, (q, context): PlanningQuery => {
        return {
            ...q,
            includeKey: context?.includeKey,
            parentQuery: context?.parentQuery,
            path: context.childPath,
            include: {},
        };
    });
}
