import { QueryNode } from '../types';

export function countQueries(tree: QueryNode): number {
    return tree.children.reduce((acc, child) => acc + countQueries(child), 1);
}
