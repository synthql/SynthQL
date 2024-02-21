import { RefOp, isRefOp } from '@synthql/queries';
import {

    AugmentedColumn,
    AugmentedQuery,
    AugmentedTable,
    SelectionColumn,
} from './types';
import { isPresent } from '../../../util/isPresent';
import { AnyDb, AnyQuery } from '../../../types';

interface AugmentOpts {
    defaultSchema: string;
    depth?: number;
    nodeId?: string;
    includeColumn?: string;
}

export function augmentQuery(
    query: AnyQuery,
    opts: AugmentOpts,
): AugmentedQuery {
    const depth = opts.depth ?? 0;
    const nodeId = opts.nodeId ?? 'root';
    const table = augmentTable(query.from, opts.defaultSchema);

    const augQuery: AugmentedQuery = {
        query,
        depth,
        from: table,
        id: 'root',
        join: augmentJoin(query, table, opts),
        select: agumentSelect(query, table, opts),
        where: agumentWhere(query, table),
        children: Object.entries(query.include ?? {}).map(
            ([includeColumn, nestedQuery]) => {
                return augmentQuery(nestedQuery, {
                    ...opts,
                    depth: depth + 1,
                    nodeId: `${nodeId}.${includeColumn}`,
                    includeColumn,
                });
            },
        ),
    };

    return augQuery;
}

function augmentJoin(
    query: AnyQuery,
    table: AugmentedTable,
    opts: AugmentOpts,
): AugmentedQuery['join'] | undefined {
    if (!opts.depth) {
        return undefined;
    }

    const joinConditions: Array<[column: string, RefOp<AnyDb>]> = Object.entries(query.where).filter(([key, value]) => {
        return isRefOp(value);
    });

    if (joinConditions.length === 0) {
        return undefined;
    }

    const [column, refOp] = joinConditions[0];

    const otherTable = augmentTable(refOp.$ref.table, opts.defaultSchema);

    return {
        joinTable: table,
        type: 'left',
        conditions: joinConditions.map(([column, refOp]) => {
            return {
                ownColumn: {
                    table,
                    column,
                },
                otherColumn: {
                    table: otherTable,
                    column: refOp.$ref.column,
                },
                op: refOp.$ref.op ?? '=',
            };
        })
    };
}

function augmentTable(
    tableName: string,
    defaultSchema: string,
): AugmentedTable {
    const parts = tableName.split('.');
    if (parts.length === 1) {
        return {
            name: parts[0],
            schema: defaultSchema,
            alias: `${defaultSchema}__${parts[0]}`,
        };
    }

    return {
        name: parts[1],
        schema: parts[0],
        alias: `${parts[0]}__${parts[1]}`,
    };
}

function createSelectionColumns(
    query: AnyQuery,
    table: AugmentedTable,
): SelectionColumn[] {
    return Object.entries(query.select)
        .map(([column, shouldSelect]): SelectionColumn | undefined => {
            switch (shouldSelect) {
                case true:
                    return {
                        type: 'column',
                        table,
                        column,
                        id: table.alias + '__' + column,
                    };
                case undefined:
                    return undefined;
            }
        })
        .filter(isPresent);
}

function agumentSelect(
    query: AnyQuery,
    table: AugmentedTable,
    opts: AugmentOpts,
): AugmentedQuery['select'] {
    if (!opts.depth) {
        return createSelectionColumns(query, table);
    }

    return [
        {
            type: 'jsonb_agg',
            id: `${table.schema}__${table.name}`,
            includeColumn: opts.includeColumn!,
            table,
            columns: createSelectionColumns(query, table),
        },
    ];
}

function agumentWhere(
    query: AnyQuery,
    table: AugmentedTable,
): AugmentedQuery['where'] {
    return Object.entries(query.where)
        .map(([column, value]): AugmentedQuery['where'][number] | undefined => {
            if (isRefOp(value)) {
                return undefined;
            }
            const ownColumn: AugmentedColumn = {
                table,
                column,
            };
            if (typeof value === 'object') {
                return {
                    type: 'binary',
                    lhs: {
                        type: 'column',
                        column: ownColumn,
                    },
                    op: Object.keys(value)[0] as any,
                    rhs: {
                        type: 'value',
                        value: Object.values(value)[0],
                    },
                };
            }
            if (
                typeof value === 'boolean' ||
                typeof value === 'string' ||
                typeof value === 'number'
            ) {
                return {
                    type: 'binary',
                    lhs: {
                        type: 'column',
                        column: ownColumn,
                    },
                    op: '=',
                    rhs: {
                        type: 'value',
                        value,
                    },
                };
            }
            throw new Error(
                `Unknown expression type: ${JSON.stringify(value)}`,
            );
        })
        .filter(isPresent);
}
