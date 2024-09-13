import { Table } from './types/Table';
import { Column } from './types/Column';
import { Select } from './types/Select';
import { Where } from './types/Where';
import { Include } from './types/Include';
import { Cardinality } from './types/Cardinality';
import { Schema } from './types/Schema';
import { getTableSelectableColumns } from './schema/getTableSelectableColumns';
import { getTablePrimaryKeyColumns } from './schema/getTablePrimaryKeyColumns';
import { validateNestedQueriesHaveAValidRefOp } from './validators/validateNestedQueriesHaveAValidRefOp';
import { hashQuery } from './util/hashQuery';

export class QueryBuilder<
    DB,
    TTable extends Table<DB>,
    TWhere extends Where<DB, TTable>,
    TSelect extends Select<DB, TTable>,
    TInclude extends Include<DB>,
    TLimit extends number | undefined,
    TOffset extends number | undefined,
    TCardinality extends Cardinality,
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
        private _name?: string,
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
            name: this._name,
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
        hash: string;
        name?: string;
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
            hash: hashQuery({
                from: this._from,
                where: this._where,
                select: this._select,
                include: this._include,
                limit: this._limit,
                offset: this._offset,
                cardinality: this._cardinality ?? 'many',
                lazy: this._lazy,
                groupBy: this._groupBy,
                name: this._name,
            }),
            name: this._name,
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
            this._name,
        );
    }

    /**
     * Builds a query that returns all rows that match the query filters.
     *
     * Does not override the limit set by `.limit()`.
     *
     * Note: {@link many} is an alias for {@link all}.
     */
    all() {
        return this.many();
    }

    /**
     * Builds a query that can return 0 or 1 rows. When no rows are found,
     * the query will return `null`.
     *
     * Also sets the limit to 1.
     *
     * Note: {@link maybe} is an alias for {@link first}.
     */
    first() {
        return this.maybe();
    }

    /**
     * Builds a query that returns exactly one row. Will throw an error if no rows match
     * the query filters.
     *
     * Also sets the limit to 1.
     *
     * Note: {@link one} is an alias for {@link firstOrThrow}.
     */
    firstOrThrow() {
        return this.one();
    }

    /**
     * Sets the number (n) of results to return
     * for the query, and then builds the query.
     * Shorthand for `.limit(n).all()`.
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
            this._name,
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
            this._name,
        );
    }

    /**
     * @alias {@link firstOrThrow}
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
            this._name,
        ).build();
    }

    /**
     * @alias {@link all}
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
            this._name,
        ).build();
    }

    /**
     * @alias {@link first}
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
            this._name,
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
            this._name,
        );
    }

    /**
     * Select specific columns from the table.
     * `columns` is a shorthand for `select`.
     *
     * Example:
     *
     * ```ts
     * const q = from('actor')
     *   .columns('actor_id', 'last_name')
     *   .many();
     *
     * // is equivalent to
     * const q = from('actor')
     *   .select({
     *      actor_id: true,
     *      last_name: true,
     *   });
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
            this._name,
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
            this._name,
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
            this._name,
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
            this._name,
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
            this._name,
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
            this._name,
        );
    }

    /**
     * Sets the name of the query.
     *
     * Example:
     *
     * ```ts
     * const q = from('actor')
     *   .columns('actor_id', 'last_name')
     *   .name('findActors')
     *   .many();
     * ```
     */
    name(name: string) {
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
            this._groupBy,
            name,
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
                undefined,
            );
        },
    };
}
