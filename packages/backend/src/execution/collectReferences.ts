import { RefOp } from "@synthql/queries";
import { AnyDb, AnyQuery } from "../types";
import { mapQuery } from "../util/mapQuery";
import { mapRefs } from "../util/mapRefs";

/**
 * Recursively collects all references in a query and its children.
 */
export function collectReferences(query: AnyQuery): Array<RefOp<AnyDb>> {
    const refs: Array<RefOp<AnyDb>> = [];

    mapQuery(query, query => {
        mapRefs(query.where, ref => {
            refs.push(ref);
            return ref;
        })
        return query
    })

    return refs;
}