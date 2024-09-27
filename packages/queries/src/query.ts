import {
    Static,
    Type as t,
    TArray,
    TObject,
    TPick,
    TSchema,
} from '@sinclair/typebox';
import { Assert } from '@sinclair/typebox/value';
import { getTablePrimaryKeyColumns } from './schema/getTablePrimaryKeyColumns';
import { getTableSchema } from './schema/getTableSchema';
import { getTableSelectableColumns } from './schema/getTableSelectableColumns';
import { Column } from './types/Column';
import { ColumnValue } from './types/ColumnValue';
import { Schema } from './types/Schema';
import { Select } from './types/Select';
import { Table } from './types/Table';
import { Query, QuerySchema } from './types/types';
import { Where } from './types/Where';
import { hashQuery } from './util/hashQuery';
import { validateNestedQueriesHaveAValidRefOp } from './validators/validateNestedQueriesHaveAValidRefOp';

export class QueryBuilder<
    DB,
    TTable extends Table<DB>,
    TResultSchema extends TSchema,
> {
    constructor(
        private query: Partial<Query>,
        private schema: TResultSchema,
    ) {}

    private build(): Query<unknown, unknown, TResultSchema> {
        const built: Query<unknown, unknown, TResultSchema> = assertQuery(
            this.query,
            this.schema,
        );

        built.hash = hashQuery(built);

        const whereColumns =
            Object.keys(built.where).slice(0, 2).join('-and-') || 'all';
        built.name = built.name ?? `${built.from}-by-${whereColumns}`;

        validateNestedQueriesHaveAValidRefOp(built);
        return built;
    }

    /**
     * Sets the limit of the query.
     */
    limit(limit: number) {
        const query = this.query;
        return new QueryBuilder(
            {
                ...query,
                limit,
            },
            this.schema,
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
    take(take: number) {
        const query = this.query;
        return new QueryBuilder(
            {
                ...query,
                limit: take,
            },
            this.schema,
        ).all();
    }

    /**
     * Sets the number (n) of rows to skip before returning results.
     */
    offset(offset: number): QueryBuilder<DB, TTable, TResultSchema> {
        const query = this.query;
        return new QueryBuilder(
            {
                ...query,
                offset,
            },
            this.schema,
        );
    }

    /**
     * @alias {@link firstOrThrow}
     */
    one() {
        const query = this.query;
        return new QueryBuilder(
            {
                ...query,
                limit: 1,
                cardinality: 'one',
            },
            this.schema,
        ).build();
    }

    /**
     * @alias {@link all}
     */
    many(): Query<DB, TTable, TArray<TResultSchema>> {
        const query = this.query;
        const schema = t.Array(this.schema);

        return new QueryBuilder<DB, TTable, typeof schema>(
            {
                ...query,
                cardinality: 'many',
            },
            t.Array(this.schema),
        ).build();
    }

    /**
     * @alias {@link first}
     */
    maybe() {
        const query = this.query;
        return new QueryBuilder(
            {
                ...query,
                limit: 1,
                cardinality: 'maybe',
            },
            this.schema,
        ).build();
    }

    select<TSelect extends Select<DB, TTable>>(select: TSelect) {
        const columns = Object.keys(select) as Column<DB, TTable>[];
        return this.columns(...columns);
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
    columns<TKeys extends Array<Column<DB, TTable>>>(
        ...keys: TKeys
    ): QueryBuilder<DB, TTable, TPick<TResultSchema, TKeys>> {
        type SelectFromKeys = { [k in TKeys[number]]: true };

        const select = keys.reduce((acc, key) => {
            return { ...acc, [key]: true };
        }, {} as SelectFromKeys);

        return new QueryBuilder(
            {
                ...this.query,
                select,
            },
            t.Pick(this.schema, keys) as unknown as TPick<TResultSchema, TKeys>,
        );
    }

    include<TInclude extends Exclude<Query['include'], undefined>>(
        include: TInclude,
    ): QueryBuilder<DB, TTable, AppendToSchema<TResultSchema, TInclude>> {
        const query = this.query;

        const schema = t.Composite([
            this.schema,
            t.Object(
                Object.entries(include)
                    .map(([key, value]) => {
                        return { [key]: value.schema };
                    })
                    .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as any,
            ),
        ]) as unknown as AppendToSchema<TResultSchema, TInclude>;

        return new QueryBuilder(
            {
                ...query,
                include,
            },
            schema,
        );
    }

    where(where: Where<DB, TTable>): QueryBuilder<DB, TTable, TResultSchema> {
        return this.filter(where);
    }

    filter(where: Where<DB, TTable>): QueryBuilder<DB, TTable, TResultSchema> {
        const query = this.query;
        return new QueryBuilder(
            {
                ...query,
                // TODO(fhur): fix this type assertion
                where: where as any,
            },
            this.schema,
        );
    }

    /**
     * @deprecated use {@link defer} instead.
     */
    lazy() {
        return this.defer();
    }

    /**
     * Splits the query into two queries. The first query is executed immediately,
     * and the second query is executed once the first query is finished.
     *
     * Merging of the queries will happen inside the `QueryEngine`.
     */
    defer() {
        const query = this.query;
        return new QueryBuilder(
            {
                ...query,
                lazy: true,
            },
            this.schema,
        );
    }

    groupBy<TGroupBy extends Column<DB, TTable>[]>(...groupBy: TGroupBy) {
        const query = this.query;
        return new QueryBuilder(
            {
                ...query,
                groupBy,
            },
            this.schema,
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
        const query = this.query;
        return new QueryBuilder(
            {
                ...query,
                name,
            },
            this.schema,
        );
    }
}

export function query<DB>(schema: Schema<DB>) {
    return {
        from<TTable extends Table<DB>>(table: TTable) {
            const select = getTableSelectableColumns<DB>(schema, table);

            const primaryKeys = getTablePrimaryKeyColumns<DB>(schema, table);

            const tableSchema = getTableSchema(schema, table);

            type SelectAllSchema<DB, TTable extends Table<DB>> = TObject<{
                [TColumn in Column<DB, TTable>]: TSchema & {
                    static: ColumnValue<DB, TTable, TColumn>;
                };
            }>;

            return new QueryBuilder<DB, TTable, SelectAllSchema<DB, TTable>>(
                {
                    cardinality: 'many',
                    from: table,
                    groupBy: primaryKeys,
                    select,
                    where: {},
                },
                tableSchema as SelectAllSchema<DB, TTable>,
            );
        },
    };
}

function assertQuery<T extends TSchema>(
    partialQuery: Partial<Query>,
    schema: T,
): Query<unknown, unknown, T> {
    Assert(QuerySchema, partialQuery);

    return { ...partialQuery, schema };
}

type SchemaOf<StaticType> = TSchema & { static: StaticType };

type Append<A, B> = (A & B) & {};

type AppendToSchema<Schema extends TSchema, TInclude> = SchemaOf<
    Append<
        Static<Schema>,
        {
            [key in keyof TInclude]: TInclude[key] extends Query<
                any,
                any,
                infer T
            >
                ? Static<T>
                : unknown;
        }
    >
>;
