import { AnyDB, RefOp, Where, WhereClause, isRefOp } from '@synthql/queries';

export function mapRefs(
    where: Where<AnyDB, string>,
    mapper: (ref: RefOp<AnyDB>) => WhereClause<AnyDB, string, string>,
) {
    const copy = { ...where };
    for (const key in copy) {
        const clause = copy[key] as unknown;
        if (isRefOp(clause)) {
            copy[key] = mapper(clause);
        }
    }
    return copy;
}
