import { DB } from "./tests/db";
import { sql } from "./tests/postgres";
import { from } from "./tests/queries";
import { isPresent, isString } from "./util/isPresent";

export const unaryOperators = [
    'not',
    '-',
    'exists',
    'not exists',
] as const;

export type UnaryOperator = typeof unaryOperators[number];

export const binaryOperators = [
    '=',
    '==',
    '!=',
    '<>',
    '>',
    '>=',
    '<',
    '<=',
    'in',
    'not in',
    'is',
    'is not',
    'like',
    'not like',
    'match',
    'ilike',
    'not ilike',
    '@>',
    '<@',
    '&&',
    '?',
    '?&',
    '!<',
    '!>',
    '<=>',
    '!~',
    '~',
    '~*',
    '!~*',
    '@@',
    '@@@',
    '!!',
    '<->',
    'regexp',
    '+',
    '-',
    '*',
    '/',
    '%',
    '^',
    '&',
    '|',
    '#',
    '<<',
    '>>',
    '&&',
    '||',
] as const;

export type BinaryOperator = typeof binaryOperators[number];

export const nAryOperators = [
    'and',
    'or',
    '=',
    '==',
    '!=',
    '<>',
    '>',
    '>=',
    '<',
    '<=',
    'in',
    'not in',
    'is',
    'is not',
    'like',
    '#>',
    '#>>',
    'not like',
    'match',
    'ilike',
    'not ilike',
    '@>',
    '<@',
    '&&',
    '?',
    '?&',
    '!<',
    '!>',
    '<=>',
    '!~',
    '~',
    '~*',
    '!~*',
    '@@',
    '@@@',
    '!!',
    '<->',
    'regexp',
    '+',
    '-',
    '*',
    '/',
    '%',
    '^',
    '&',
    '|',
    '#',
    '<<',
    '>>',
    '&&',
    '||',
    '->',
    '->>',
    'not',
    '-',
    'exists',
    'not exists',
    'between',
    'between symmetric',
] as const;

export type NAryOperator = typeof nAryOperators[number];

type JoinType = 'inner' | 'left' | 'right' | 'full';

type JoinExp =
    [join: JoinType, table: string, on: Exp];

export type Exp =
    | null
    | string
    | number
    | boolean
    | [UnaryOperator, Exp]
    | [BinaryOperator, Exp, Exp]
    | [NAryOperator, Exp, ...Exp[]]
    | ['ref', string, string]
    | ['->', Exp, string]
    | ['param', number]
    | ['as', Exp, string]
    | ['::', Exp, string]
    | [`fn:${string}`, ...Exp[]]
    | ['when', condition: Exp, whenTrue: Exp, whenFalse: Exp]
    | {
        from: string;
        where: Exp;
        select: Exp[];
        groupBy?: Exp[];
        having?: Exp;
        orderBy?: Exp[];
        limit?: number;
        offset?: number;
        joins?: JoinExp[];
    }



export function compile<T extends Exp>(exp: T): string {
    if (exp === null) {
        return `null`;
    }
    if (typeof exp === 'string') {
        if (exp.startsWith(':')) {
            return exp.slice(1);
        }

        return `'${exp}'`;
    }
    if (typeof exp === 'number') {
        return String(exp);
    }
    if (typeof exp === 'boolean') {
        return String(exp);
    }
    if (Array.isArray(exp)) {
        const op = exp[0];
        if (op === '::') {
            return `(${compile(exp[1])})::${exp[2]}`;
        }

        if (op === 'param') {
            return `$${Number(exp[1])}`;
        }

        if (op === 'ref') {
            const [_, table, column] = exp;
            if (column === '*') {
                return `"${table}".*`;
            }
            return `"${table}"."${column}"`;
        }

        if (isFnOp(op)) {
            const fn = op.slice(3);
            return `${fn}(${exp
                .slice(1)
                .map((arg) => compile(arg))
                .join(', ')})`;
        }

        if (op === 'as') {
            const [_, e, alias] = exp;
            return `${compile(e)} as ${alias}`;
        }

        if (op === 'when') {
            const [_, condition, whenTrue, whenFalse] = exp;
            return `case when ${compile(condition)} then ${compile(
                whenTrue,
            )} else ${compile(whenFalse)} end`;
        }

        if (unaryOperators.includes(op as any)) {
            return `(${op} ${compile(exp[1])})`;
        }

        if (nAryOperators.includes(op as any)) {
            const [op, ...args] = exp;
            return `(${args.map((arg) => compile(arg)).join(` ${op} `)})`;
        }

        if (binaryOperators.includes(op as any)) {
            const [op, arg1, arg2] = exp;
            return `(${compile(arg1)} ${op} ${compile(arg2!)})`;
        }
    }
    if (typeof exp === 'object' && "from" in exp) {
        const { from, select, where, groupBy, having, joins, limit, offset, orderBy } = exp;
        return [
            `select ${select.map(compile).join(', ')}`,
            `from "${from}"`,
            `${joins?.map(([join, table, on]) => `${join} join "${table}" on ${compile(on)}`).join(' ') || ''}`,
            where && `where ${compile(where)}`,
            `${groupBy ? `group by ${groupBy.map(compile).join(', ')}` : ''}`,
            `${having ? `having ${compile(having)}` : ''}`,
            `${orderBy ? `order by ${orderBy.map(compile).join(', ')}` : ''}`,
            `${limit ? `limit ${limit}` : ''}`,
            `${offset ? `offset ${offset}` : ''}`,
        ].filter(isString).map(s => s.trim()).filter(Boolean).join(' ');
    }

    throw new Error('Unknown expression: ' + JSON.stringify(exp));
}

export function isEqual(exp1: Exp, exp2: Exp): Exp {
    return ['=', exp1, exp2];
}

export function isPositive(exp: Exp): Exp {
    return ['>', exp, 0];
}

export function isNegative(exp: Exp): Exp {
    return ['<', exp, 0];
}

export function isZero(exp: Exp): Exp {
    return ['=', exp, 0];
}

export function coalesce(exp: Exp, def: Exp): Exp {
    return ['fn:coalesce', exp, def];
}

export function isNotNull(exp: Exp): Exp {
    return ['is not', exp, null];
}

export function isNull(exp: Exp): Exp {
    return ['is', exp, null];
}

export function isFnOp(expOp: unknown): expOp is `fn:${string}` {
    return typeof expOp === 'string' && expOp.startsWith('fn:');
}

export function sum(exp: Exp): Exp {
    return ['fn:sum', exp];
}

export function $(param: number): Exp {
    return ['param', param];
}

export type ColumnReference<T> = {
    [K in keyof T]: T[K] extends object ? `${K & string}.${(keyof T[K] & string) | '*'}` : never
}[keyof T];

export function ref<DB>(refString: ColumnReference<DB>): Exp {
    const [table, column] = String(refString).split('.');
    return ['ref', table, column];
}

export function when(condition: Exp, whenTrue: Exp, whenFalse: Exp): Exp {
    return ['when', condition, whenTrue, whenFalse];
}

export const cast = {
    asText: (exp: Exp): Exp => {
        return ['::', exp, 'text'];
    },
    asNumeric: (exp: Exp): Exp => {
        return ['::', exp, 'numeric'];
    },
    asInteger: (exp: Exp): Exp => {
        return ['::', exp, 'integer'];
    },
    asUuid: (exp: Exp): Exp => {
        return ['::', exp, 'uuid'];
    }
}

export const json = {
    get: (exp: Exp, key: string): Exp => {
        return ['->', exp, key];
    },
    getAsText: (exp: Exp, key: string): Exp => {
        return ['->>', exp, key];
    },
    getAsNumeric: (exp: Exp, key: string): Exp => {
        return ['::', coalesce(['->>', exp, key], '0'), 'numeric'];
    },
    agg: (exp: Exp): Exp => {
        return ['fn:json_agg', exp];
    },
    buildObject: (...exp: Exp[]): Exp => {
        return ['fn:json_build_object', ...exp];
    },
}

export function distinct(exp: Exp): Exp {
    return ['fn:distinct', exp];
}

export function count(exp: Exp): Exp {
    return ['fn:count', exp];
}

export const jsonb = {
    buildObject: (...exp: Exp[]): Exp => {
        return ['fn:jsonb_build_object', ...exp];
    },
    agg: (exp: Exp): Exp => {
        return ['fn:jsonb_agg', exp];
    },
}

export function as(exp: Exp, alias: string): Exp {
    return ['as', exp, alias];
}


export function chain(exp: Exp, ...fns: Array<(exp: Exp) => Exp>): Exp {
    return fns.reduce((acc, fn): Exp => {
        return fn(acc);
    }, exp);
}