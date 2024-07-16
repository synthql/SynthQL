import { isRefOp } from '@synthql/queries';
import { iterateResultRows } from '../../query/iterateResultRow';
import { resolveReferences } from '../../query/resolveReferences';
import { isPresent } from '../../util/isPresent';
import { mapTree } from '../../util/tree/mapTree';
import { ExecuteProps } from '../execute';
import {
    ExecPlanTree,
    ExecResultTree,
    ExecutionPlanNode,
    ExecResultNode as ExecutionResultNode,
} from '../types';

export function executePlan(
    planTree: ExecPlanTree,
    { defaultSchema }: ExecuteProps,
): AsyncGenerator<ExecResultTree> {
    const executionContext = { refContext: planTree.refContext };
    return mapTree<ExecutionPlanNode, ExecutionResultNode>(
        planTree,
        async (planNode, parentNode): Promise<ExecutionResultNode> => {
            // Replace refs with values
            const query = resolveReferences(
                planNode.query,
                executionContext.refContext,
                defaultSchema,
            );

            // Remove the limit for child nodes, since we don't know how many rows the references will resolve to
            if (parentNode) {
                query.limit = undefined;
            }

            // Execute the query
            const rows = await planNode.executor.execute(query, {
                defaultSchema,
            });

            // Collect refs from the result
            for (const { column, values: value } of iterateResultRows(
                rows,
                query,
                defaultSchema,
            )) {
                executionContext.refContext.addValues(column, ...value);
            }

            return {
                path: planNode.query.path,
                filters: createFilters(planNode),
                inputQuery: planNode.inputQuery,
                result: rows,
                children: [],
            };
        },
    );
}

function createFilters(
    planNode: ExecutionPlanNode,
): ExecutionResultNode['filters'] {
    return Object.entries(planNode.inputQuery.where)
        .map(([childColumn, whereClause]) => {
            if (isRefOp(whereClause)) {
                return {
                    op: '=' as const,
                    childColumn,
                    parentColumn: whereClause.$ref.column,
                };
            }
        })
        .filter(isPresent);
}
