import { AnyDB } from '@synthql/queries';
import { OPERATORS, UnaryOperator } from 'kysely';
import { TableRef } from '../../../../refs/TableRef';
import { ColumnRef } from '../../../../refs/ColumnRef';
import { Where, isRefOp } from '@synthql/queries';
import { compareJoins } from './compareJoins';
import { Join } from './types';

type Primitive = string | number | boolean | null | Date | Array<Primitive>;

function isPrimitive(x: unknown): x is Primitive {
    return (
        typeof x === 'string' ||
        typeof x === 'number' ||
        typeof x === 'boolean' ||
        x === null ||
        x instanceof Date ||
        Array.isArray(x)
    );
}

const ops = [...OPERATORS, '= any', 'not = any'] as const;
type BinaryOperator = (typeof ops)[number];

function assertOp(x: unknown): asserts x is BinaryOperator {
    if (!ops.includes(x as BinaryOperator)) {
        throw new Error(`Invalid operator: ${x}`);
    }
}

function assertPrimitive(x: unknown, msg?: string): asserts x is Primitive {
    if (!isPrimitive(x)) {
        throw new Error(
            msg ??
            `Expected ${JSON.stringify(x)} to be a primitive but was ${typeof x}`,
        );
    }
}

export function string(str: string): Exp {
    return ['const', str];
}

/**
 * @returns 'str'::jsonb
 */
export function jsonb(str: string) {
    return cast(string(str), 'jsonb');
}

export function cast(exp: Exp, type: string): Cast {
    return ['cast', exp, type];
}

export function coalesce(exp: Exp, defaultExp: Exp): Fn {
    return ['fn', 'coalesce', exp, defaultExp];
}

export function equals(exp1: Exp, exp2: Exp): Op {
    return ['op', '=', exp1, exp2];
}

export function eqAny(exp: Exp, expArray: Exp): Op {
    return equals(exp, ['fn', 'any', expArray]);
}

export function jsonbAgg(exp: Exp): Fn {
    return ['fn', 'jsonb_agg', exp];
}

export function as(exp: Exp, alias: string): As {
    return ['as', exp, alias];
}

export function not(exp: Exp): UnaryOp {
    return ['op:unary', 'not', exp];
}

export function distinct(exp: Exp): Fn {
    return ['fn', 'distinct', exp];
}

type OpEqAny = ['op', '= any', Exp, Exp];
type OpNotEqAny = ['op', 'not = any', Exp, Exp];
type As = ['as', Exp, string];
type UnaryOp = ['op:unary', UnaryOperator, Exp];
type Op = ['op', BinaryOperator, ...Exp[]];
type Fn = ['fn', string, ...Exp[]];
type Const = ['const', Primitive];
type Param = ['param', Primitive];
type Cast = ['cast', Exp, string];
type Identifier = string;

type Exp =
    | OpEqAny
    | OpNotEqAny
    | UnaryOp
    | As
    | Op
    | Fn
    | Const
    | Param
    | Cast
    | Identifier;

export function compileExp(exp: Exp): SqlBuilder {
    const builder = new SqlBuilder();
    if (typeof exp === 'string') {
        return builder.addColumnReference(exp);
    }
    switch (exp[0]) {
        case 'op': {
            const [_, op, ...exps] = exp;
            if (exp[1] === '= any') {
                const [_, op, exp1, exp2] = exp;
                return compileExp(eqAny(exp1, exp2));
            }
            if (exp[1] === 'not = any') {
                const [_, op, exp1, exp2] = exp;
                return compileExp(not(eqAny(exp1, exp2)));
            }

            return builder.addOp(exp);
        }
        case 'op:unary': {
            return builder.addUnaryOp(exp);
        }
        case 'as': {
            return builder.addAs(exp);
        }
        case 'fn': {
            return builder.addFn(exp);
        }
        case 'const': {
            const [_, value] = exp;
            return builder.addConst(value);
        }
        case 'param': {
            const [_, value] = exp;
            return builder.addParam(value);
        }
        case 'cast': {
            const [_, expToCast, type] = exp;

            return builder
                .openParen()
                .addBuilder(compileExp(expToCast))
                .closeParen()
                .addCast(type);
        }
    }
}

type Part = string | { type: 'param'; value: unknown };
export class SqlBuilder {
    private parts: Array<Part> = [];

    constructor() {
        this.parts = [];
    }

    static comma() {
        return new SqlBuilder().add(', ');
    }

    static and() {
        return new SqlBuilder().add(' and ');
    }

    static columnAlias(col: ColumnRef) {
        return new SqlBuilder().add(col.aliasQuoted());
    }

    addParam(value: Primitive) {
        return this.add({ type: 'param', value }).space();
    }

    addConst(value: Primitive) {
        if (typeof value === 'string') {
            // TODO: escape string
            return this.add(`'${value}'`).space();
        }
        if (Array.isArray(value)) {
            return this.openParen()
                .addInterleaved(
                    value.map((v) => compileExp(['const', v])),
                    SqlBuilder.comma(),
                )
                .closeParen();
        }
        return this.add(String(value)).space();
    }

    addColumnReference(column: string) {
        // TODO: validate that column is a valid column reference
        return this.add(column).space();
    }

    /**
     * Adds a column to the select clause
     *
     * Example: "public::users".id as "id"
     */
    addSelectColumn(column: ColumnRef) {
        return this.add(column.aliasQuoted())
            .space()
            .add('as')
            .space()
            .add('"')
            .add(column.column)
            .add('"')
            .space();
    }

    addCast(type: string) {
        // TODO: validate that type is a valid type
        return this.add(`::${type} `);
    }

    addInterleaved(builders: SqlBuilder[], separator: SqlBuilder) {
        if (builders.length === 0) {
            return this;
        }
        builders
            .flatMap((builder, i) => {
                if (i === 0) {
                    return [builder];
                }
                return [separator.space(), builder];
            })
            .forEach((builder) => this.addBuilder(builder));
        return this;
    }

    addOperator(op: BinaryOperator) {
        const unknownOp = op as unknown;
        if (!OPERATORS.includes(op as any)) {
            throw new Error(`Invalid operator: ${op}`);
        }
        return this.add(op);
    }

    addFn(fn: Fn) {
        const [_, name, ...args] = fn;
        return this.add(name)
            .openParen()
            .addInterleaved(
                args.map((arg) => compileExp(arg)),
                SqlBuilder.comma(),
            )
            .closeParen();
    }

    addAs(as: As) {
        const [_, exp, alias] = as;
        // TODO validate that alias is a valid alias
        return this.addBuilder(compileExp(exp)).space().add(`as "${alias}" `);
    }

    addOp(op: Op) {
        const [_, opName, ...exps] = op;
        return this.openParen()
            .addInterleaved(
                exps.map((exp) => compileExp(exp)),
                new SqlBuilder().addOperator(opName),
            )
            .closeParen()
            .space();
    }

    addUnaryOp([_, op, exp]: UnaryOp) {
        return this.add(op)
            .space()
            .openParen()
            .addBuilder(compileExp(exp))
            .closeParen();
    }

    openParen() {
        return this.add('( ');
    }

    closeParen() {
        return this.add(' )');
    }

    private add(part: Part) {
        this.parts.push(part);
        return this;
    }

    isEmpty() {
        return this.parts.length === 0;
    }

    /**
     * Adds a space at the end unless there is already a space.
     */
    space() {
        const lastPart = this.parts[this.parts.length - 1];
        if (!lastPart) {
            return this.add(' ');
        }
        if (typeof lastPart !== 'string') {
            return this;
        }
        if (lastPart.endsWith(' ')) {
            return this;
        }
        return this.add(' ');
    }

    addBuilder(builder: SqlBuilder) {
        this.parts.push(...builder.parts);
        return this;
    }

    addBuilders(builders: SqlBuilder[]) {
        for (const builder of builders) {
            this.addBuilder(builder);
        }
        return this;
    }

    select(select: SqlBuilder[]) {
        return this.add('select ')
            .addInterleaved(select, SqlBuilder.comma())
            .space();
    }

    from(table: TableRef) {
        return this.add('from ')
            .add(table.canonical())
            .space()
            .add(table.aliasQuoted())
            .space();
    }

    groupBy(columns: ColumnRef[]) {
        if (columns.length === 0) {
            return this;
        }

        const aliasedColumns = columns.map((c) => SqlBuilder.columnAlias(c));

        return this.add('group by ')
            .addInterleaved(aliasedColumns, SqlBuilder.comma())
            .space();
    }

    limit(limit?: number) {
        if (limit === undefined) {
            return this;
        }
        if (typeof limit !== 'number') {
            throw new Error(`Expected limit to be a number`);
        }
        return this.add(`limit ${Number(limit)} `);
    }

    leftJoin(join: Join) {
        const table = join.table;

        const where = new SqlBuilder().expressionFromWhere({
            table,
            where: join.where,
        });

        return this.add('left join ')
            .add(table.canonical())
            .space()
            .add(table.aliasQuoted())
            .add(' on ')
            .addInterleaved(
                [
                    ...join.conditions.map((cond) => {
                        const own = cond.ownColumn.aliasQuoted();
                        const other = cond.otherColumn.aliasQuoted();
                        const op = cond.op;
                        return new SqlBuilder()
                            .add(own)
                            .space()
                            .add(op)
                            .space()
                            .add(other)
                            .space();
                    }),
                    where,
                ].filter((b) => !b.isEmpty()),
                SqlBuilder.and(),
            );
    }

    leftJoins(joins: Join[]) {
        const sorted = Array.from(joins).sort(compareJoins);

        for (const join of sorted) {
            this.leftJoin(join);
        }
        return this;
    }

    offset(offset?: number) {
        if (offset === undefined) {
            return this;
        }
        if (typeof offset !== 'number') {
            throw new Error(`Expected offset to be a number`);
        }
        return this.add(`offset ${Number(offset)} `);
    }

    build() {
        const params: any[] = [];
        return {
            sql: this.parts
                .map((part) => {
                    if (typeof part === 'string') {
                        return part;
                    } else {
                        params.push(part.value);
                        return `$${params.length}`;
                    }
                })
                .join(''),
            params,
        };
    }

    expressionFromWhere({
        table,
        where = {},
    }: {
        table: TableRef;
        where?: Where<AnyDB, any>;
    }) {
        const expressions = Object.entries(where)
            .map(([column, op]): Exp | undefined => {
                const quotedColumn = table.column(column).aliasQuoted();
                if (op === null) {
                    return ['op', 'is', quotedColumn, ['const', null]];
                }
                if (isPrimitive(op)) {
                    const exp: Exp = ['op', '=', quotedColumn, ['param', op]];
                    return exp;
                }
                if (isRefOp(op)) {
                    return undefined;
                }
                if (typeof op === 'object' && Object.keys(op).length === 1) {
                    const [opName, value] = Object.entries(op)[0];
                    assertOp(opName);
                    assertPrimitive(
                        value,
                        `Expected value ${JSON.stringify(value)} to be a primitive in ${JSON.stringify(op)}`,
                    );

                    if (opName === 'in') {
                        return ['op', '= any', quotedColumn, ['param', value]];
                    }

                    return ['op', opName, quotedColumn, ['param', value]];
                }
            })
            .flatMap((exp) => (exp ? [compileExp(exp)] : []));

        if (expressions.length === 0) {
            return this;
        }
        return this.addInterleaved(expressions, SqlBuilder.and()).space();
    }

    expressionFromManyWhere(
        where: { table: TableRef; where?: Where<AnyDB, any> }[],
    ) {
        const expressions = where
            .map((w) => new SqlBuilder().expressionFromWhere(w))
            .filter((b) => !b.isEmpty());
        if (expressions.length === 0) {
            return this;
        }
        return this.add('where ').addInterleaved(expressions, SqlBuilder.and());
    }
}
