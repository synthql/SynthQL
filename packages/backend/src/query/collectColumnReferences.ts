import { isRefOp } from "@synthql/queries";
import { TableRef } from "../refs/TableRef";
import { ColumnRef } from "../refs/ColumnRef";
import { AnyQuery } from "../types";
import { collectFromQuery } from "./collectFromQuery";

/**
 * Recursively collects all unique columns referenced in the query.
 */
export function collectColumnReferences(query: AnyQuery, defaultSchema: string): Array<ColumnRef> {
    const array = collectFromQuery(query, q => {
        const table = TableRef.fromQuery(defaultSchema, q);
        return collectRefsFromWhere(q, table)
            .concat(collectRefsFromRefOp(q, defaultSchema))
    })

    const map = new Map<string, ColumnRef>();

    array.forEach(ref => {
        map.set(ref.column, ref)
    })

    return Array.from(map.values())
}

function collectRefsFromWhere(query: AnyQuery, table: TableRef): Array<ColumnRef> {
    return Object.keys(query.where).map(column => {
        return table.column(column)
    })
}

function collectRefsFromRefOp(query: AnyQuery, defaultSchema: string): Array<ColumnRef> {
    return Object.values(query.where).flatMap((clause) => {
        if (isRefOp(clause)) {
            return [ColumnRef.fromRefOp(clause, defaultSchema)]
        }
        return []
    })
}