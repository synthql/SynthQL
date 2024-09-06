import { AnyDB, AnyQuery, Where, isRefOp } from '@synthql/queries';
import { collectFromQuery } from '../../../../query/collectFromQuery';
import { SelectionColumn } from './SelectionColumn';
import { SelectionJsonbAgg } from './SelectionJsonbAgg';
import { TableRef } from '../../../../refs/TableRef';
import { ColumnRef } from '../../../../refs/ColumnRef';
import { Join, Selection } from './types';

export interface AugmentedQuery {
    selection: Selection[];
    rootQuery: AnyQuery;
    rootTable: TableRef;
    joins: Array<Join>;
    wheres: { table: TableRef; where: Where<AnyDB, string> }[];
    groupingColumns: ColumnRef[];
}

export function createAugmentedQuery(
    rootQuery: AnyQuery,
    defaultSchema: string,
): AugmentedQuery {
    const rootTable = TableRef.fromQuery(defaultSchema, rootQuery);
    const selectionColumn: Selection[] = SelectionColumn.fromQuery(
        rootQuery,
        defaultSchema,
    );
    const jsonbAggColumn: Selection[] = SelectionJsonbAgg.fromQuery(
        rootQuery,
        defaultSchema,
    );
    const wheres = collectWhere(rootQuery, defaultSchema);
    const joins = collectJoins(rootQuery, defaultSchema);
    const groupingColumns =
        rootQuery.groupBy?.map((col) => rootTable.column(col)) ?? [];

    return {
        selection: selectionColumn.concat(jsonbAggColumn),
        rootQuery,
        rootTable,
        joins,
        wheres,
        groupingColumns,
    };
}

function collectJoins(query: AnyQuery, defaultSchema: string): Array<Join> {
    return collectFromQuery(query, (query) => {
        const conditions = Object.entries(query.where).flatMap(
            ([column, refOp]) => {
                if (!isRefOp(refOp)) {
                    return [];
                }
                return [
                    {
                        ownColumn: TableRef.fromQuery(
                            defaultSchema,
                            query,
                        ).column(column),
                        otherColumn: ColumnRef.fromRefOp(refOp, defaultSchema),
                        op: refOp.$ref.op ?? '=',
                    },
                ];
            },
        );

        if (conditions.length === 0) {
            return [];
        }

        return [
            {
                table: TableRef.fromQuery(defaultSchema, query),
                conditions,
            },
        ];
    });
}

function collectWhere(
    query: AnyQuery,
    defaultSchema: string,
): Array<{ table: TableRef; where: Where<AnyDB, string> }> {
    return collectFromQuery(query, (query) => {
        return [
            {
                table: TableRef.fromQuery(defaultSchema, query),
                where: query.where,
            },
        ];
    });
}
