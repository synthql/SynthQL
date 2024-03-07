import { RefOp } from "@synthql/queries";
import { escapeRef } from "./escapeRef";
import { AnyDb } from "../types";
import { TableRef } from "./TableRef";

export class ColumnRef {
    public readonly tableRef: TableRef;
    public readonly column: string;

    constructor(tableRef: TableRef, column: string) {
        this.tableRef = tableRef;
        this.column = escapeRef(column, false);
    }

    /**
     * Example: "public::table".column
     */
    aliasQuoted() {
        return this.tableRef.aliasQuoted() + '.' + this.column;
    }

    canonical() {
        return this.tableRef.canonical() + '.' + `"${this.column}"`;
    }

    static fromRefOp(op: RefOp<AnyDb>, defaultSchema: string): ColumnRef {
        const table = TableRef.parse(op.$ref.table, defaultSchema);
        return table.column(op.$ref.column);
    }

    static parse(ref: string, defaultSchema: string): ColumnRef {
        const parts = ref.split(".");
        if (parts.length === 1) {
            throw new Error(`Invalid column reference ${ref}`);
        } else if (parts.length === 2) {
            const [table, column] = parts;
            return TableRef.parse(table, defaultSchema).column(column);
        } else if (parts.length === 3) {
            const [schema, table, column] = parts;
            return new TableRef(schema, table).column(column);
        }
        throw new Error(`Invalid column reference ${ref}`);
    }
}
