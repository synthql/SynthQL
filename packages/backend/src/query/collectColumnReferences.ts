import { isRefOp } from '@synthql/queries';
import { TableRef } from '../refs/TableRef';
import { ColumnRef } from '../refs/ColumnRef';
import { AnyQuery } from '../types';
import { collectFromQuery } from './collectFromQuery';
import { Path } from '../execution/types';

type ColumnWithPath = {
    column: ColumnRef;
    path: Path;
};

/**
 * Recursively collects all unique columns referenced in the query.
 */
export function collectColumnReferences(
    query: AnyQuery,
    defaultSchema: string,
): Array<ColumnWithPath> {
    const array = collectFromQuery(query, (q, { insertionPath: path }) => {
        const table = TableRef.fromQuery(defaultSchema, q);
        const columns = collectRefsFromWhere(q, table).concat(
            collectRefsFromRefOp(q, defaultSchema),
        );
        return columns.map((column) => {
            return {
                column,
                path: [...path, column.column],
            };
        });
    });

    const map = new Map<string, ColumnWithPath>();

    array.forEach((col) => {
        map.set(col.column.canonical(), col);
    });

    return Array.from(map.values());
}

function collectRefsFromWhere(
    query: AnyQuery,
    table: TableRef,
): Array<ColumnRef> {
    return Object.keys(query.where ?? {}).map((column) => {
        return table.column(column);
    });
}

function collectRefsFromRefOp(
    query: AnyQuery,
    defaultSchema: string,
): Array<ColumnRef> {
    return Object.values(query.where ?? {}).flatMap((clause) => {
        if (isRefOp(clause)) {
            return [ColumnRef.fromRefOp(clause, defaultSchema)];
        }
        return [];
    });
}
