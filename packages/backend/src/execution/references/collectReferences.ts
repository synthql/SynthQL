import { RefOp } from "@synthql/queries";
import { AnyDb, AnyQuery } from "../../types";
import { collectFromQuery } from "../../util/collectFromQuery";
import { mapRefs } from "../../util/mapRefs";

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