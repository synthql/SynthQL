import { DB } from 'kysely-codegen';
import { Column, Include, RefOp, Select, Table, Where } from './types/Query';
import { ColumnReference } from './expression';

export function table(table: keyof DB) {
    return table;
}

export function column<
    TTable extends keyof DB,
    TColumn extends keyof DB[TTable] & string,
>(
    table: TTable,
    column: TColumn,
): {
    $on: `${TTable}.${TColumn}`;
} {
    return { $on: `${table}.${column}` };
}


export function col<DB>(ref: ColumnReference<DB>): RefOp<DB> {
    const parts = ref.split('.');
    if (parts.length === 2) {
        return {
            $ref: {
                table: parts[0] as any,
                column: parts[1] as any,
                op: '=',
            }
        }
    }
    if (parts.length === 3) {
        return {
            $ref: {
                table: `${parts[0]}.${parts[1]}` as any,
                column: parts[2] as any,
                op: '=',
            }
        }
    }
    throw new Error(`Invalid column reference: ${ref}`);
}

export function ref<DB>() {
    return {
        table: <TTable extends Table<DB>>(table: TTable) => {
            return {
                column: <TColumn extends Column<DB, TTable>>(
                    column: TColumn,
                ): RefOp<DB> => {
                    return {
                        $ref: {
                            table,
                            column,
                            op: '=',
                        },
                    };
                },

                eqAny: <TColumn extends Column<DB, TTable>>(
                    column: TColumn,
                ): RefOp<DB> => {
                    return {
                        $ref: {
                            table,
                            column,
                            op: '= any',
                        },
                    };
                },
            };
        },
    };
}

export class QueryBuilder<
    DB,
    TTable extends Table<DB>,
    TWhere extends Where<DB, TTable>,
    TCardinality extends 'one' | 'maybe' | 'many',
    TInclude extends Include<DB>,
    TSelect extends Select<DB, TTable>,
    TLazy extends true | undefined,
    TGroupingId extends string,
> {
    constructor(
        private _from: TTable,
        private _where: TWhere,
        private _select: TSelect,
        private _include: TInclude,
        private _limit: number | undefined,
        private _cardinality: TCardinality,
        private _lazy: TLazy,
        private _groupingId: TGroupingId,
    ) { }

    private build(): {
        from: TTable;
        where: TWhere;
        select: TSelect;
        include: TInclude;
        limit: number | undefined;
        cardinality: TCardinality;
        lazy: TLazy;
        groupingId: TGroupingId;
    } {
        return {
            from: this._from,
            where: this._where,
            select: this._select,
            include: this._include,
            limit: this._limit,
            cardinality: this._cardinality ?? 'many',
            lazy: this._lazy,
            groupingId: this._groupingId,
        };
    }

    // Below methods are refactored to include TLazy in their return types
    limit(limit: number) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TCardinality,
            TInclude,
            TSelect,
            TLazy,
            TGroupingId
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            limit,
            this._cardinality,
            this._lazy,
            this._groupingId,
        );
    }

    one() {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            'one',
            TInclude,
            TSelect,
            TLazy,
            TGroupingId
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            1,
            'one',
            this._lazy,
            this._groupingId,
        ).build();
    }

    many() {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            'many',
            TInclude,
            TSelect,
            TLazy,
            TGroupingId
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            this._limit,
            'many',
            this._lazy,
            this._groupingId,
        ).build();
    }

    maybe() {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            'maybe',
            TInclude,
            TSelect,
            TLazy,
            TGroupingId
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            1,
            'maybe',
            this._lazy,
            this._groupingId,
        ).build();
    }

    select<TSelect extends Select<DB, TTable>>(select: TSelect) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TCardinality,
            TInclude,
            TSelect,
            TLazy,
            TGroupingId
        >(
            this._from,
            this._where,
            select,
            this._include,
            this._limit,
            this._cardinality,
            this._lazy,
            this._groupingId,
        );
    }

    include<TInclude extends Include<DB>>(include: TInclude) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TCardinality,
            TInclude,
            TSelect,
            TLazy,
            TGroupingId
        >(
            this._from,
            this._where,
            this._select,
            include,
            this._limit,
            this._cardinality,
            this._lazy,
            this._groupingId,
        );
    }

    alsoInclude<TNewInclude extends Include<DB>>(include: TNewInclude) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TCardinality,
            TInclude & TNewInclude,
            TSelect,
            TLazy,
            TGroupingId
        >(
            this._from,
            this._where,
            this._select,
            { ...this._include, ...include },
            this._limit,
            this._cardinality,
            this._lazy,
            this._groupingId,
        );
    }

    where<TWhere extends Where<DB, TTable>>(where: TWhere) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TCardinality,
            TInclude,
            TSelect,
            TLazy,
            TGroupingId
        >(
            this._from,
            where,
            this._select,
            this._include,
            this._limit,
            this._cardinality,
            this._lazy,
            this._groupingId,
        );
    }

    lazy() {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TCardinality,
            TInclude,
            TSelect,
            true,
            TGroupingId
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            this._limit,
            this._cardinality,
            true,
            this._groupingId,
        );
    }

    groupingId<TGroupingId extends string>(id: TGroupingId) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TCardinality,
            TInclude,
            TSelect,
            TLazy,
            TGroupingId
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            this._limit,
            this._cardinality,
            this._lazy,
            id,
        );
    }
}

export function query<DB>() {
    return {
        from<TTable extends Table<DB>>(table: TTable) {
            return new QueryBuilder<DB, TTable, {}, 'many', {}, {}, undefined, 'id'>(
                table,
                {},
                {},
                {},
                undefined,
                'many',
                undefined,
                'id',
            );
        },
    };
}

export function maybe<TQuery>(
    query: TQuery,
): TQuery & { cardinality: 'maybe' } {
    return { ...query, cardinality: 'maybe' as const };
}
