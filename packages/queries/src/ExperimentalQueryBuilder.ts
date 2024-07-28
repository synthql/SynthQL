// ignore type errors in this file
// @ts-nocheck
import { Exp } from './expression/Exp';
import { DB } from './generated';
import { BinaryOperator } from './types/BinaryOp';
import { Table } from './types/Table';

type Primitive = string | number | boolean | null | undefined | Date;

type GetFromScope<Scope, Key> = Key extends keyof Scope ? Scope[Key] : never;

type ExpressionType<E, Scope> = E extends string
    ? GetFromScope<Scope, E>
    : E extends { $returnType?: infer T }
      ? T
      : E extends Primitive
        ? E
        : never;

type RowType<T extends keyof DB> = {
    [col in keyof DB[T]['columns']]: DB[T]['columns'][col] extends {
        type: infer TType;
    }
        ? TType
        : never;
};

type Query<Scope = {}> = {
    from: string;
    columns: string[];
    where: BooleanExpressions<Scope>;
    groupBy: string[];
    aggregates: Record<string, Exp<Scope>>;
    having: BooleanExpressions<Scope>;
    orderBy: string[];
    limit: number;
    offset: number;
};

/**
 * @see https://www.postgresql.org/docs/current/functions-comparison.html
 */
function eq<Scope>(a: Exp<Scope>, b: Exp<Scope>): BooleanExpressions<Scope> {
    return {
        type: 'op',
        op: '=',
        args: [a, b],
    };
}

/**
 * @see https://www.postgresql.org/docs/current/functions-logical.html
 */
function not<Scope>(a: BooleanExpressions<Scope>): BooleanExpressions<Scope> {
    return {
        type: 'op',
        op: 'not',
        arg: a,
    };
}

function add<Scope>(
    a: NumberExpressions<Scope>,
    b: NumberExpressions<Scope>,
): NumberExpressions<Scope> {
    return {
        type: 'op',
        op: '+',
        args: [a, b],
    };
}

function count<Scope>(a: Exp): NumberExpressions<Scope> {
    return {
        type: 'fn',
        fn: 'count',
        args: [a],
    };
}

function str<Scope>(value: string): StringExpressions<Scope> {
    return {
        type: 'const',
        value,
    };
}

function or<Scope>(
    ...args: BooleanExpressions<Scope>[]
): BooleanExpressions<Scope> {
    return {
        type: 'op',
        op: '||',
        args,
    };
}

export class ExperimentalQueryBuilder<DB, Scope> {
    private _filter: Exp<Scope, boolean> | undefined;

    constructor(private table: string) {}

    filter(exp: Exp<Scope, boolean>): ExperimentalQueryBuilder<DB, Scope> {
        this._filter = exp;
        return this;
    }

    count() {
        return this.aggregate({ count: count(1) })
            .select('count')
            .take(1);
    }

    select<TSelection extends keyof Scope>(
        ...columns: TSelection[]
    ): ExperimentalQueryBuilder<DB, Pick<Scope, TSelection>> {
        return this;
    }

    groupBy<TSelection extends keyof Scope>(
        ...columns: TSelection[]
    ): ExperimentalQueryBuilder<DB, Scope> {
        return this;
    }

    aggregate<TAggregates extends Record<string, Exp<Scope, number>>>(
        aggregates: TAggregates,
    ): ExperimentalQueryBuilder<DB, Scope & TAggregates> {
        return this;
    }

    take(count: number): Scope {
        return this;
    }
}

function from_experimental<TTable extends Table<DB>>(table: TTable) {
    return new ExperimentalQueryBuilder<DB, RowType<TTable>>(table);
}

from_experimental('actor').count();

from_experimental('actor')
    .filter(or(eq(str('asdf'), 'first_name'), eq(str('asdf'), 'last_name')))
    .groupBy('last_name')
    .aggregate({ count: count(1) })
    .select('count', 'last_name');
