import { Query, QueryResult, Table } from "@synthql/queries";
import { AnyQuery } from "./types";

export interface QueryProvider {
    table: string;
    execute(query: AnyQuery): Promise<Array<any>>;
}

export function provider<DB>() {
    return {
        table(table: Table<DB>) {
            return {
                execute(fn: (query: Query<DB, Table<DB>>) => Promise<any>) {
                    return {
                        table,
                        execute: fn
                    }
                }
            };
        }
    }
}