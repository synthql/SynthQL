import { DB } from "kysely-codegen"
import { Column, Include, RefOp, Select, Table, Where } from "./types/Query"

export function table(table: keyof DB) {
    return table
}

export function column<TTable extends keyof DB, TColumn extends keyof DB[TTable] & string>(table: TTable, column: TColumn): {
    $on: `${TTable}.${TColumn}`
} {
    return { $on: `${table}.${column}` }
}

export function ref<DB>() {
    return {
        table: <TTable extends Table<DB>>(table: TTable) => {
            return {
                column: <TColumn extends Column<DB, TTable>>(column: TColumn): RefOp<DB> => {
                    return {
                        $ref: {
                            table,
                            column,
                            op: '='
                        }
                    }
                },

                eqAny: <TColumn extends Column<DB, TTable>>(column: TColumn): RefOp<DB> => {
                    return {
                        $ref: {
                            table,
                            column,
                            op: '= any'
                        }
                    }
                },
            }
        },
    }
}

class QueryBuilder<
    DB,
    TTable extends Table<DB>,
    TWhere extends Where<DB, TTable>,
    TCardinality extends 'one' | 'maybe' | 'many',
    TInclude extends Include<DB>,
    TSelect extends Select<DB, TTable>,
    TLazy extends true | undefined = undefined // Step 1
> {
    constructor(
        private _from: TTable,
        private _where: TWhere,
        private _select: TSelect,
        private _include: TInclude,
        private _limit: number | undefined,
        private _cardinality: TCardinality,
        private _lazy: TLazy // Step 2
    ) {

    }

    private build(): {
        from: TTable,
        where: TWhere,
        select: TSelect,
        include: TInclude,
        limit: number | undefined,
        cardinality: TCardinality,
        lazy: TLazy
    } {
        return {
            from: this._from,
            where: this._where,
            select: this._select,
            include: this._include,
            limit: this._limit,
            cardinality: this._cardinality,
            lazy: this._lazy
        }
    }

    // Below methods are refactored to include TLazy in their return types
    limit(limit: number) {
        return new QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, TLazy>(this._from, this._where, this._select, this._include, limit, this._cardinality, this._lazy);
    }

    one() {
        return new QueryBuilder<DB, TTable, TWhere, 'one', TInclude, TSelect, TLazy>(this._from, this._where, this._select, this._include, 1, 'one', this._lazy).build();
    }

    many() {
        return new QueryBuilder<DB, TTable, TWhere, 'many', TInclude, TSelect, TLazy>(this._from, this._where, this._select, this._include, this._limit, 'many', this._lazy).build();
    }

    maybe() {
        return new QueryBuilder<DB, TTable, TWhere, 'maybe', TInclude, TSelect, TLazy>(this._from, this._where, this._select, this._include, 1, 'maybe', this._lazy).build();
    }

    select<TSelect extends Select<DB, TTable>>(select: TSelect) {
        return new QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, TLazy>(this._from, this._where, select, this._include, this._limit, this._cardinality, this._lazy);
    }

    include<TInclude extends Include<DB>>(include: TInclude) {
        return new QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, TLazy>(this._from, this._where, this._select, include, this._limit, this._cardinality, this._lazy);
    }

    where<TWhere extends Where<DB, TTable>>(where: TWhere) {
        return new QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, TLazy>(this._from, where, this._select, this._include, this._limit, this._cardinality, this._lazy);
    }

    lazy() {
        return new QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, true>(this._from, this._where, this._select, this._include, this._limit, this._cardinality, true);
    }
}


export function query<DB,>() {
    return {
        from<TTable extends Table<DB>>(table: TTable) {
            return new QueryBuilder<DB, TTable, {}, 'many', {}, {}>(table, {}, {}, {}, undefined, 'many', undefined)
        }
    }
}

export function maybe<TQuery>(query: TQuery): TQuery & { cardinality: 'maybe' } {
    return { ...query, cardinality: 'maybe' as const }
}