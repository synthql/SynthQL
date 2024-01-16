import { AnyQuery, QueryNode } from "../types";

export function createQueryTree(query: AnyQuery, nodeId: string = 'root', depth = -1): QueryNode {
    const newDepth = depth + 1;
    return {
        depth: newDepth,
        id: nodeId,
        query,
        children: Object
            .entries(query.include ?? {})
            .map(([key, nestedQuery]) => {
                return createQueryTree(nestedQuery, `${nodeId}.${key}`, newDepth)
            })
    };
}

