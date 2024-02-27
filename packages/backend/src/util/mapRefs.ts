import { RefOp, Where, WhereClause, isRefOp } from "@synthql/queries"
import { AnyDb, AnyQuery } from "../types";

export function mapRefs(where: Where<AnyDb, string>, mapper: (ref: RefOp<AnyDb>) => WhereClause<AnyDb, string, string>) {
    const copy = { ...where }
    for (const key in copy) {
        const clause = where[key] as unknown;
        if (isRefOp(clause)) {
            where[key] = mapper(clause)
        }
    }
    return copy
}