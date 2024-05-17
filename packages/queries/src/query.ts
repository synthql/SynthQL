import { Include } from './types/Include';
import { Where } from './types/Where';
import { Select } from './types/Select';
import { Column } from './types/Column';
import { Table } from './types/Table';

export class QueryBuilder<
    DB,
    TTable extends Table<DB>,
    TWhere extends Where<DB, TTable>,
    TSelect extends Select<DB, TTable>,
    TInclude extends Include<DB>,
    TCardinality extends 'one' | 'maybe' | 'many',
    TLazy extends true | undefined,
    TGroupingId extends string[],
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
    ) {}

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

    /**
     * Sets the limit of the query.
     */
    limit(limit: number) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TCardinality,
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
            'one',
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
            'many',
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
            'maybe',
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
            TSelect,
            TInclude,
            TCardinality,
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
            SelectFromKeys,
            TInclude,
            TCardinality,
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
            TSelect,
            TInclude,
            TCardinality,
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
            TSelect,
            TInclude & TNewInclude,
            TCardinality,
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
            TSelect,
            TInclude,
            TCardinality,
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
            TSelect,
            TInclude,
            TCardinality,
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

    groupingId<TGroupingId extends Column<DB, TTable>[]>(...id: TGroupingId) {
        return new QueryBuilder<
            DB,
            TTable,
            TWhere,
            TSelect,
            TInclude,
            TCardinality,
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

export function query<DB>(schema: any) {
    return {
        from<TTable extends Table<DB>>(table: TTable) {
            // type a = Array<Column<DB, TTable>>;

            // type SelectFromKeys = { [k in a[number]]: true };

            // const object: a = [];

            // const select = object.reduce((acc, key) => {
            //     return { ...acc, [key]: true };
            // }, {} as SelectFromKeys);

            // type a = Array<string>;

            // type TSelect = { [k in a[number]]: true };

            // const array: a = [];

            // const select = array.reduce((acc, key) => {
            //     return { ...acc, [key]: true };
            // }, {} as TSelect);

            // const object: { [k in a[number]]: true } = {};

            const object: Record<string, boolean | undefined> = {};

            const properties = schema.properties;

            if (properties) {
                const tableDef = properties[table];

                if (tableDef) {
                    const tableDefProperties = tableDef.properties;

                    if (tableDefProperties) {
                        const columnsDef = tableDefProperties['columns'];

                        if (columnsDef) {
                            const columnsDefProperties = columnsDef.properties;

                            if (columnsDefProperties) {
                                for (const column in columnsDefProperties) {
                                    if (column) {
                                        const columnDef =
                                            columnsDefProperties[column];

                                        if (columnDef) {
                                            const columnDefProperties =
                                                columnDef.properties;

                                            if (columnDefProperties) {
                                                const selectableDef =
                                                    columnDefProperties[
                                                        'selectable'
                                                    ];

                                                if (selectableDef) {
                                                    const value =
                                                        selectableDef.const;

                                                    if (
                                                        typeof value ===
                                                        'boolean'
                                                    ) {
                                                        // array.push(column);
                                                        object[column] = value;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return new QueryBuilder<
                DB,
                TTable,
                {},
                {},
                {},
                'many',
                undefined,
                ['id']
            >(table, {}, object, {}, undefined, 'many', undefined, ['id']);
        },
    };
}
