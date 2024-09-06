import { AnyQuery } from '@synthql/queries';

export interface QueryNode {
    includeKey: string | undefined;
    query: AnyQuery;
    children: QueryNode[];
}

export function createQueryTree(
    query: AnyQuery,
    includeKey: string | undefined = undefined,
): QueryNode {
    const result: QueryNode = {
        includeKey,
        query,
        children: [],
    };

    for (const [includeKey, subQuery] of Object.entries(query.include ?? {})) {
        result.children.push(createQueryTree(subQuery, includeKey));
    }
    return result;
}
