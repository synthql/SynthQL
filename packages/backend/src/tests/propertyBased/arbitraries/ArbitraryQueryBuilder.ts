import { Any } from '@sinclair/typebox';
import { Cardinality, Column, Query, Schema, Table } from '@synthql/queries';
import fc from 'fast-check';
import { DB as PagilaDB, schema } from '../../generated';
import { getTableDef } from '../getTableDef';
import { getTableNames } from '../getTableNames';
import { getTableSelectableColumns } from '../getTableSelectableColumns';
import { tablesToSkip } from '../tablesToSkip';

export class ArbitraryQueryBuilder<DB> {
    constructor(
        private schema: Schema<DB>,
        private cardinalities: Cardinality[] = ['many', 'maybe', 'one'],
        private tables: Table<DB>[] = getTableNames(schema).filter(
            (table) => !tablesToSkip.includes(table),
        ) as Table<DB>[],
        private hasResults: boolean = true,
    ) {}

    /**
     * Creates a new ArbitraryQueryBuilder from the Pagila DB.
     */
    static fromPagila() {
        return new ArbitraryQueryBuilder<PagilaDB>(schema);
    }

    withCardinality(...cardinality: Cardinality[]) {
        return new ArbitraryQueryBuilder<DB>(
            this.schema,
            cardinality,
            this.tables,
            this.hasResults,
        );
    }

    withTable(...tables: Table<DB>[]) {
        return new ArbitraryQueryBuilder<DB>(
            this.schema,
            this.cardinalities,
            tables,
            this.hasResults,
        );
    }

    /**
     * Return a query with no results.
     *
     * The query is guaranteed to return no results.
     */
    withNoResults() {
        return new ArbitraryQueryBuilder<DB>(
            this.schema,
            this.cardinalities,
            this.tables,
            false,
        );
    }

    /**
     * Return a query with some results.
     *
     * The query is guaranteed to return at least one result.
     */
    withSomeResults() {
        return new ArbitraryQueryBuilder<DB>(
            this.schema,
            this.cardinalities,
            this.tables,
            true,
        );
    }

    private arbTable(): fc.Arbitrary<Table<DB>> {
        return fc.constantFrom(...this.tables);
    }

    private arbSelect<TTable extends Table<DB>>(
        tableName: TTable,
    ): fc.Arbitrary<Query['select']> {
        return fc
            .subarray(
                getTableSelectableColumns(this.schema, tableName) as Column<
                    DB,
                    TTable
                >[],
            )
            .chain((cols) => {
                const select: Record<
                    Column<DB, TTable>,
                    fc.Arbitrary<true>
                > = {};
                cols.forEach((col) => {
                    // In the future we might want to relax this constraint
                    // and allow for selecting booleans (And other types)
                    select[col] = fc.constant(true);
                });

                return fc.record(select);
            });
    }

    private arbWhere<TTable extends Table<DB>>(
        tableName: TTable,
    ): fc.Arbitrary<Query['where']> {
        if (this.hasResults) {
            // for now we will just return all rows
            return fc.constant({});
        }

        return fc.constant({});
    }

    private arbGroupBy(tableName: Table<DB>): fc.Arbitrary<string[]> {
        return fc.constant(getPrimaryKeyColumns(this.schema, tableName));
    }

    private arbCardinality(): fc.Arbitrary<Cardinality> {
        return fc.constantFrom(...this.cardinalities);
    }

    private arbLimit(): fc.Arbitrary<number> {
        if (!this.hasResults) {
            return fc.constant(0);
        }

        return fc.integer({ min: this.hasResults ? 1 : 0 });
    }

    build() {
        const table = this.arbTable();

        return table.chain<Query>((tableName) => {
            return fc.record<Query>({
                from: fc.constant(tableName),
                select: this.arbSelect(tableName),
                cardinality: this.arbCardinality(),
                where: this.arbWhere(tableName),
                groupBy: this.arbGroupBy(tableName),
                limit: this.arbLimit(),
                schema: fc.constant(Any()),
            });
        });
    }
}

function getPrimaryKeyColumns<DB>(
    schema: Schema<DB>,
    table: string,
): Array<string> {
    const tableDef = getTableDef<DB>(schema, table);

    return Object.entries(tableDef.properties.columns.properties)
        .filter(([_, columnDef]) => {
            return columnDef.properties.isPrimaryKey.const;
        })
        .map(([columnName]) => {
            return columnName;
        });
}
