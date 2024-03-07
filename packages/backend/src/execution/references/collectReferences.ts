import { RefOp } from "@synthql/queries";
import { AnyDb, AnyQuery } from "../../types";
import { collectFromQuery } from "../../query/collectFromQuery";
import { mapRefs } from "../../query/mapRefs";

/**
 * Recursively collects all references in a query and its children.
 */
export function collectReferences(query: AnyQuery): Array<RefOp<AnyDb>> {
    return collectFromQuery(query, q => {
        const refs: Array<RefOp<AnyDb>> = [];
        mapRefs(q.where, ref => {
            refs.push(ref);
            return ref
        })
        return refs
    })
}