import { RefOp, Where, WhereClause, isRefOp } from "@synthql/queries";
import { AnyDb } from "../types";

export function mapRefs(where: Where<AnyDb, string>, mapper: (ref: RefOp<AnyDb>) => WhereClause<AnyDb, string, string>) {
    const copy = { ...where }
    for (const key in copy) {
        const clause = copy[key] as unknown;
        if (isRefOp(clause)) {
            copy[key] = mapper(clause)
        }
    }
    return copy
}