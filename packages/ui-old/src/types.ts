import { Query } from 'xql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyQuery = Query<any, any>;

export interface QueryNode {
    id: string;
    depth: number;
    query: AnyQuery;
    children: QueryNode[];
}
