import { ResultRow } from "../execution/types";
import { ColumnRef } from "../refs/ColumnRef";
import { AnyQuery } from "../types";
import { getIn } from "../util/tree/getIn";
import { columns } from "./columns";
import { iterateQuery } from "./iterateQuery";

export function* iterateResultRows(rows: ResultRow[], query: AnyQuery, defaultSchema: string): Generator<{
    column: ColumnRef,
    values: unknown[],
}> {


    for (const { query: subQuery, insertionPath } of iterateQuery(query)) {
        const cols = columns(subQuery, defaultSchema)
        for (const col of cols) {
            const path = [...insertionPath, col.column]

            yield {
                column: col,
                values: getIn(rows, path)
            }
        }
    }


}