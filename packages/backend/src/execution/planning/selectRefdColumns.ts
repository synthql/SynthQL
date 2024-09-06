import { AnyQuery } from '@synthql/queries';
import { ColumnRef } from '../../refs/ColumnRef';
import { TableRef } from '../../refs/TableRef';

/**
 * Recursively select all referenced columns in the query.
 */
export function selectRefdColumns<TQuery extends AnyQuery>(
    query: TQuery,
    allColumns: ColumnRef[],
    defaultSchema: string,
): TQuery {
    const table = TableRef.fromQuery(defaultSchema, query);

    // Filter to only columns from the same table as the query.
    const refdColumns: ColumnRef[] = allColumns.filter((col) =>
        col.tableRef.equals(table),
    );

    // Make a copy of the select object, so we don't mutate the original query.
    const select = structuredClone(query.select ?? {});

    // Add all referenced columns to the select object.
    for (const column of refdColumns) {
        if (select[column.column]) {
            continue;
        }
        select[column.column] = true;
    }

    // Recursively select refd columns in the include object.
    const include = { ...query.include };
    for (const [key, subquery] of Object.entries(include)) {
        include[key] = selectRefdColumns(subquery, allColumns, defaultSchema);
    }

    return {
        ...query,
        select,
        include,
    };
}
