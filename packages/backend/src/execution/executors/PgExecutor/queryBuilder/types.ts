import { SqlBuilder } from "./exp"
import { ColumnRef, TableRef } from "./refs"
import { JoinOp } from "@synthql/queries"

export interface Selection {
    extractFromRow(row: any, target: any): void
    toSql(): SqlBuilder,
}

export type Join = {
    table: TableRef,
    conditions: Array<{ ownColumn: ColumnRef, otherColumn: ColumnRef, op: JoinOp }>
}