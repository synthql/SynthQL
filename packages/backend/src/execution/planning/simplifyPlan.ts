import { collectLast } from '../..';
import { collectFromQuery } from '../../query/collectFromQuery';
import { mapTree } from '../../util/tree/mapTree';
import { ExecPlanTree, ExecutionPlanNode } from '../types';

type SimplifiedPlan = {
    from: string;
    executor: string;
    children: Array<SimplifiedPlan>;
};

/**
 * Only used for testing
 */
export async function simplifyPlan(
    plan: ExecPlanTree,
): Promise<SimplifiedPlan> {
    const tree = await collectLast(
        mapTree<ExecutionPlanNode, SimplifiedPlan>(
            plan,
            async (node): Promise<SimplifiedPlan> => {
                const tables = collectFromQuery(node.query, (q) => [q.from]);
                return {
                    executor: node.executor.constructor.name,
                    from: tables.join(', '),
                    children: [],
                };
            },
        ),
    );
    return tree.root;
}
