import { Query, QueryResult, Table } from "@synthql/queries";

export interface QueryProvider<DB, TTable extends Table<DB>> {
    table: TTable;
    execute(query: Query<DB, TTable>): Promise<any>;
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