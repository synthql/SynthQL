import { Include } from './types/Include';
import { Where } from './types/Where';
import { Select } from './types/Select';
import { Column } from './types/Column';
import { Table } from './types/Table';
import { Schema } from './types/Schema';
import { getTableSelectableColumns } from './schema/getTableSelectableColumns';
import { getTablePrimaryKeyColumns } from './schema/getTablePrimaryKeyColumns';
import { validateNestedQueriesHaveAValidRefOp } from './validators/validateNestedQueriesHaveAValidRefOp';

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
    ) {
        validateNestedQueriesHaveAValidRefOp<DB>({
            from: this._from,
            where: this._where,
            select: this._select,
            include: this._include,
            limit: this._limit,
            offset: this._offset,
            cardinality: this._cardinality ?? 'many',
            lazy: this._lazy,
            groupBy: this._groupBy,
        });
    }

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
        };
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
            TGroupBy
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
            TGroupBy
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
            TGroupBy
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
            TGroupBy
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
            TGroupBy
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
            TGroupBy
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
            TGroupBy
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
            TGroupBy
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
            TGroupBy
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
            TGroupBy
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
        );
    }

    where(where: Where<DB, TTable>) {
        return this.filter(where);
    }

    filter(where: Where<DB, TTable>) {
        return new QueryBuilder<
            DB,
            TTable,
            // Note that we don't merge the literal types, we are fine
            // with the low resultion Where type, as the Where doesn't
            // impact the QueryResult.
            Where<DB, TTable>,
            TSelect,
            TInclude,
            TLimit,
            TOffset,
            TCardinality,
            TLazy,
            TGroupBy
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
            TGroupBy
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
            TGroupBy
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
                typeof primaryKeys
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
            );
        },
    };
}
