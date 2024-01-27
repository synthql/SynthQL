import { Table, ColumnReference, Select, Where, Include, RefOp, Column } from "./types";
export declare function col<DB>(ref: ColumnReference<DB>): RefOp<DB>;
export declare function ref<DB>(): {
    table: <TTable extends Table<DB>>(table: TTable) => {
        column: <TColumn extends Column<DB, TTable>>(column: TColumn) => RefOp<DB>;
        eqAny: <TColumn_1 extends Column<DB, TTable>>(column: TColumn_1) => RefOp<DB>;
    };
};
export declare class QueryBuilder<DB, TTable extends Table<DB>, TWhere extends Where<DB, TTable>, TCardinality extends 'one' | 'maybe' | 'many', TInclude extends Include<DB>, TSelect extends Select<DB, TTable>, TLazy extends true | undefined, TGroupingId extends string> {
    private _from;
    private _where;
    private _select;
    private _include;
    private _limit;
    private _cardinality;
    private _lazy;
    private _groupingId;
    constructor(_from: TTable, _where: TWhere, _select: TSelect, _include: TInclude, _limit: number | undefined, _cardinality: TCardinality, _lazy: TLazy, _groupingId: TGroupingId);
    private build;
    limit(limit: number): QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, TLazy, TGroupingId>;
    one(): {
        from: TTable;
        where: TWhere;
        select: TSelect;
        include: TInclude;
        limit: number | undefined;
        cardinality: "one";
        lazy: TLazy;
        groupingId: TGroupingId;
    };
    many(): {
        from: TTable;
        where: TWhere;
        select: TSelect;
        include: TInclude;
        limit: number | undefined;
        cardinality: "many";
        lazy: TLazy;
        groupingId: TGroupingId;
    };
    maybe(): {
        from: TTable;
        where: TWhere;
        select: TSelect;
        include: TInclude;
        limit: number | undefined;
        cardinality: "maybe";
        lazy: TLazy;
        groupingId: TGroupingId;
    };
    select<TSelect extends Select<DB, TTable>>(select: TSelect): QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, TLazy, TGroupingId>;
    include<TInclude extends Include<DB>>(include: TInclude): QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, TLazy, TGroupingId>;
    alsoInclude<TNewInclude extends Include<DB>>(include: TNewInclude): QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude & TNewInclude, TSelect, TLazy, TGroupingId>;
    where<TWhere extends Where<DB, TTable>>(where: TWhere): QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, TLazy, TGroupingId>;
    lazy(): QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, true, TGroupingId>;
    groupingId<TGroupingId extends string>(id: TGroupingId): QueryBuilder<DB, TTable, TWhere, TCardinality, TInclude, TSelect, TLazy, TGroupingId>;
}
export declare function query<DB>(): {
    from<TTable extends Table<DB>>(table: TTable): QueryBuilder<DB, TTable, {}, "many", {}, {}, undefined, "id">;
};
export declare function maybe<TQuery>(query: TQuery): TQuery & {
    cardinality: 'maybe';
};
