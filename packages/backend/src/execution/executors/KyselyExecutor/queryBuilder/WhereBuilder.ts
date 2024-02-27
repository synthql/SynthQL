import { isRefOp } from "@synthql/queries";
import { ExpressionOrFactory, RawBuilder, SqlBool, sql } from "kysely";
import { AnyDb, AnyQuery } from "../../../../types";
import { ColumnRef, TableRef } from "./refs";

export class WhereBuilder {

    private constructor(private table: TableRef, private where: AnyQuery['where']) {
    }

    static fromQuery(rootQuery: AnyQuery, defaultSchema: string): WhereBuilder[] {
        const queue: AnyQuery[] = [rootQuery];
        const result: WhereBuilder[] = [];


        while (queue.length > 0) {
            const query = queue.pop()!;
            if (query.where !== undefined) {
                result.push(new WhereBuilder(TableRef.fromQuery(defaultSchema, query), query.where))
            }

            if (query.include !== undefined) {
                for (const subQuery of Object.values(query.include)) {
                    queue.push(subQuery)
                }
            }
        }

        return result
    }

    toSql(): ExpressionOrFactory<AnyDb, string, SqlBool> {
        return (eb) => {
            const expressions = Object.entries(this.where).flatMap(([column, op]) => {
                return asBinaryExpression(this.table.column(column), op)
            });
            return eb.and(expressions)
        }
    }
}

function asBinaryExpression(column: ColumnRef, op: unknown): RawBuilder<AnyDb>[] {
    if (op === null) {
        return [sql`${sql.raw(column.aliasQuoted())} is null`]
    }
    if (typeof op === 'bigint' || typeof op === 'number' || typeof op === 'string' || typeof op === 'boolean' || op instanceof Date) {
        return [sql`${sql.raw(column.aliasQuoted())} = ${op}`]
    }
    if (isRefOp(op)) {
        return []
    }
    if (typeof op === 'object' && Object.keys(op).length === 1) {
        const [opName, value] = Object.entries(op)[0];
        return [sql`${sql.raw(column.aliasQuoted())} ${sql.raw(opName)} ${value}`]
    }
    if (typeof op === 'object') {
        return Object.entries(op).flatMap(([op, value]) => {
            return asBinaryExpression(column, { [op]: value })
        });
    }
    throw new Error(`Unsupported where clause ${column}: ${JSON.stringify(op)}`)
}