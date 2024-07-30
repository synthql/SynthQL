import { describeQuery } from '../../query/describeQuery';
import { ColumnRef } from '../../refs/ColumnRef';
import { ExecuteProps } from '../execute';
import { ExecutionPlanNode, PlanningQuery } from '../types';
import { selectRefdColumns } from './selectRefdColumns';

export function assignExecutors(
    q: PlanningQuery,
    allColumns: ColumnRef[],
    props: ExecuteProps,
): ExecutionPlanNode {
    const { defaultSchema } = props;

    const { executor, inputQuery, query, remaining } = getExecutorOrThrow(
        q,
        props,
    );
    const children = remaining.map((child) =>
        assignExecutors(child, allColumns, props),
    );
    return {
        executor,
        inputQuery,
        query: selectRefdColumns(query, allColumns, defaultSchema),
        children,
    };
}

function getExecutorOrThrow(query: PlanningQuery, props: ExecuteProps) {
    const { executors } = props;
    for (const executor of executors) {
        const canExecute = executor.canExecute(query);
        if (canExecute) {
            return {
                executor,
                inputQuery: query,
                query: canExecute.query,
                remaining: canExecute.remaining,
            };
        }
    } /* v8 ignore next 2 */
    throw new Error(`No executor found for query:\n${describeQuery(query)}`);
}
