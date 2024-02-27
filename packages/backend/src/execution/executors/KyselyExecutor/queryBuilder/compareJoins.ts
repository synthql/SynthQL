import { Join } from "./types";

/**
 * @returns true if a references b
 */
function references(a: Join, b: Join): boolean {
    return a.conditions.some(cond => {
        return cond.otherColumn.tableRef.table === b.table.table
    })
}


export function compareJoins(left: Join, right: Join): number {
    if (references(left, right)) {
        return 1
    }
    if (references(right, left)) {
        return -1
    }
    return 0
}