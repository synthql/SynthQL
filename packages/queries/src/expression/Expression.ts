export type Primitive = string | number | boolean | null | Date;

export const unaryOperators = ['not', '-', 'exists', 'not exists'] as const;

export type UnaryOperator = (typeof unaryOperators)[number];

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

export type BinaryOperator = (typeof binaryOperators)[number];

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

export type NAryOperator = (typeof nAryOperators)[number];

/**
 * An expression that invokes a function
 */
export type ExpFunctionInvocation<Context> = [
    '>invoke',
    functionName: string,
    ...Exp<Context>[],
];

/**
 * An expression that references a column in a table
 */
export type ExpColumnReference<Context> = Context;

/**
 * An expression that casts an expression to a different type
 */
export type ExpCast<Context> = ['>::', exp: Exp<Context>, type: string];

/**
 * An expression that conditionally evaluates to one of two expressions
 */
export type ExpWhen<Context> = [
    '>when',
    condition: Exp<Context>,
    whenTrue: Exp<Context>,
    whenFalse: Exp<Context>,
];

/**
 * A literal is serialized as a value in the query
 * e.g. `SELECT * FROM table WHERE column = 1`
 */
export type ExpLiteral = ['>literal', Primitive] | Exclude<Primitive, string>;

/**
 * A parameter is serialized as a placeholder in the query
 * e.g. `SELECT * FROM table WHERE column = $1`
 */
export type ExpParam = ['>param', Primitive];

export type Exp<Context> =
    | ExpLiteral
    | ExpParam
    | ExpFunctionInvocation<Context>
    | ExpColumnReference<Context>
    | ExpCast<Context>
    | ExpWhen<Context>
    | [UnaryOperator, Exp<Context>]
    | [BinaryOperator, Exp<Context>, Exp<Context>]
    | [NAryOperator, Exp<Context>, ...Exp<Context>[]];
