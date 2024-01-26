import { Query, Table } from "xql";
import { QueryKey } from "@tanstack/react-query"


export type XqlQueryKey<
    DB = any,
    TTable extends Table<DB
    > = any, TQuery extends Query<DB, TTable> = Query<DB, TTable>>
    = readonly ['xql', TQuery]

export function xqlQueryKey<DB, TTable extends Table<DB>, TQuery extends Query<DB, TTable>>(query: TQuery): ['xql', TQuery] {
    return ['xql', query];
}
