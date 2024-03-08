import { AnyQuery } from "../types";

type ParentNode = { query: AnyQuery, includeKey: string };

export function mapQuery<T extends AnyQuery>(query: AnyQuery, mapFn: (query: AnyQuery, parent?: { query: AnyQuery, includeKey: string }) => T, parentNode?: ParentNode): T {
    const mapped = mapFn(query, parentNode);
    const include = { ...mapped.include };
    for (const [includeKey, subQuery] of Object.entries(include)) {
        include[includeKey] = mapQuery(subQuery, mapFn, { query: mapped, includeKey });
    }
    return {
        ...mapped,
        include,
    };
}