import { Include } from './types/Include';
import { Where } from './types/Where';
import { Select } from './types/Select';
import { Column } from './types/Column';
import { Table } from './types/Table';
import { Schema } from './types/Schema';
import { getTableSelectableColumns } from './schema/getTableSelectableColumns';
import { getTablePrimaryKeyColumns } from './schema/getTablePrimaryKeyColumns';
import { Exp } from './expression/Exp';

export class QueryBuilder<
    DB,
    TTable extends Table<DB>,
    TWhere extends Where<DB, TTable>,
    TSelect extends Select<DB, TTable>,
    TInclude extends Include<DB>,
    TLimit extends number | undefined,
    TOffset extends number | undefined,
    TCardinality extends 'one' | 'maybe' | 'many',
    TLazy extends true | undefined,
    TGroupBy extends string[],
    TAggregates extends Record<string, Exp> | undefined,
> {
    constructor(
        private _from: TTable,
        private _where: TWhere,
        private _select: TSelect,
        private _include: TInclude,
        private _limit: TLimit,
        private _offset: TOffset,
        private _cardinality: TCardinality,
        private _lazy: TLazy,
        private _groupBy: TGroupBy,
        private _aggregates: TAggregates,
    ) {}

    private build(): {
        from: TTable;
        where: TWhere;
        select: TSelect;
        include: TInclude;
        limit: TLimit;
        offset: TOffset;
        cardinality: TCardinality;
        lazy: TLazy;
        groupBy: TGroupBy;
        aggregates: TAggregates;
    } {
        return {
            from: this._from,
            where: this._where,
            select: this._select,
            include: this._include,
            limit: this._limit,
            offset: this._offset,
            cardinality: this._cardinality ?? 'many',
            lazy: this._lazy,
            groupBy: this._groupBy,
            aggregates: this._aggregates,
        };
    }

    /**
     * Returns a query that counts the number of rows that match the query.
     *
     * Example:
     *
     * ```ts
     * const query = from('actor')
     *  .where({ actor_id: {in: [1,2,3]} })
     *  .count()
     *
     * const { data } = useSynthql({query})
     *
     * console.log(data.count) // 3
     * ```
     *
     * This will return a query that counts the number of rows in the `actor` table where `actor_id = 1`.
     */
    count() {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            {},
            TInclude,
            undefined,
            undefined,
            'one',
            TLazy,
            TGroupBy,
            {
                count: { type: 'fn'; fn: 'count'; args: [1] };
            }
        >(
            this._from,
            this._where,
            {},
            this._include,
            undefined,
            undefined,
            'one',
            this._lazy,
            this._groupBy,
            {
                count: { type: 'fn', fn: 'count', args: [1] },
            },
        ).build();
    }

    /**
     * Sets the limit of the query.
     */
    limit(limit: TLimit) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TLimit,
            TOffset,
            TCardinality,
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            limit,
            this._offset,
            this._cardinality,
            this._lazy,
            this._groupBy,
            this._aggregates,
        );
    }

    /**
     * Sets the number (n) of results to return for the query. Shorthand for `.limit(n).many()`.
     */
    take(take: TLimit) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TLimit,
            TOffset,
            'many',
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            take,
            this._offset,
            'many',
            this._lazy,
            this._groupBy,
            this._aggregates,
        ).build();
    }

    /**
     * Sets the number (n) of rows to skip before returning results.
     */
    offset(offset: TOffset) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TLimit,
            TOffset,
            TCardinality,
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            this._limit,
            offset,
            this._cardinality,
            this._lazy,
            this._groupBy,
            this._aggregates,
        );
    }

    /**
     * Builds a query that returns exactly one row. Will throw an error if the query returns 0.
     *
     * Also sets the limit to 1.
     */
    one() {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            1,
            TOffset,
            'one',
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            1,
            this._offset,
            'one',
            this._lazy,
            this._groupBy,
            this._aggregates,
        ).build();
    }

    /**
     * Builds a query that returns many rows.
     */
    many() {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TLimit,
            TOffset,
            'many',
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            this._limit,
            this._offset,
            'many',
            this._lazy,
            this._groupBy,
            this._aggregates,
        ).build();
    }

    /**
     * Builds a query with a cardinality of 'maybe'. This means that the query will return 0 or 1 rows.
     */
    maybe() {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            1,
            TOffset,
            'maybe',
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            1,
            this._offset,
            'maybe',
            this._lazy,
            this._groupBy,
            this._aggregates,
        ).build();
    }

    select<TSelect extends Select<DB, TTable>>(select: TSelect) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TLimit,
            TOffset,
            TCardinality,
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            select,
            this._include,
            this._limit,
            this._offset,
            this._cardinality,
            this._lazy,
            this._groupBy,
            this._aggregates,
        );
    }

    /**
     * Select specific columns from the table. `columns` is a shorthand for `select`. Example:
     *
     * ```ts
     * const q = from('actor')
     *   .columns('actor_id', 'last_name')
     *   .many()
     *
     * // is equivalent to
     * const q = from('actor')
     *   .select({
     *      actor_id: true,
     *      last_name: true,
     *   })
     * ```
     */
    columns<TKeys extends Array<Column<DB, TTable>>>(...keys: TKeys) {
        type SelectFromKeys = { [k in TKeys[number]]: true };

        const select = keys.reduce((acc, key) => {
            return { ...acc, [key]: true };
        }, {} as SelectFromKeys);

        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            { [k in TKeys[number]]: true },
            TInclude,
            TLimit,
            TOffset,
            TCardinality,
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            select,
            this._include,
            this._limit,
            this._offset,
            this._cardinality,
            this._lazy,
            this._groupBy,
            this._aggregates,
        );
    }

    include<TInclude extends Include<DB>>(include: TInclude) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TLimit,
            TOffset,
            TCardinality,
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            this._select,
            include,
            this._limit,
            this._offset,
            this._cardinality,
            this._lazy,
            this._groupBy,
            this._aggregates,
        );
    }

    alsoInclude<TNewInclude extends Include<DB>>(include: TNewInclude) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude & TNewInclude,
            TLimit,
            TOffset,
            TCardinality,
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            this._select,
            { ...this._include, ...include },
            this._limit,
            this._offset,
            this._cardinality,
            this._lazy,
            this._groupBy,
            this._aggregates,
        );
    }

    where<TWhere extends Where<DB, TTable>>(where: TWhere) {
        return this.filter(where);
    }

    filter<TWhere extends Where<DB, TTable>>(where: TWhere) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TLimit,
            TOffset,
            TCardinality,
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            where,
            this._select,
            this._include,
            this._limit,
            this._offset,
            this._cardinality,
            this._lazy,
            this._groupBy,
            this._aggregates,
        );
    }

    lazy() {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TLimit,
            TOffset,
            TCardinality,
            true,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            this._limit,
            this._offset,
            this._cardinality,
            true,
            this._groupBy,
            this._aggregates,
        );
    }

    groupBy<TGroupBy extends Column<DB, TTable>[]>(...id: TGroupBy) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TLimit,
            TOffset,
            TCardinality,
            TLazy,
            TGroupBy,
            TAggregates
        >(
            this._from,
            this._where,
            this._select,
            this._include,
            this._limit,
            this._offset,
            this._cardinality,
            this._lazy,
            id,
            this._aggregates,
        );
    }
}

export function query<DB>(schema: Schema<DB>) {
    return {
        from<TTable extends Table<DB>>(table: TTable) {
            type TKeys = Array<Column<DB, TTable>>;

            const select = getTableSelectableColumns<DB>(schema, table);

            const primaryKeys = getTablePrimaryKeyColumns<DB>(schema, table);

            return new QueryBuilder<
                DB,
                TTable,
                {},
                { [k in TKeys[number]]: true },
                {},
                number | undefined,
                number | undefined,
                'many',
                undefined,
                typeof primaryKeys,
                undefined
            >(
                table,
                {},
                select,
                {},
                undefined,
                undefined,
                'many',
                undefined,
                primaryKeys,
                undefined,
            );
        },
    };
}
