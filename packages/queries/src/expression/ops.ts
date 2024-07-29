import { BooleanExpressions, Exp, NumberExpressions } from './Exp';

export function add<Scope>(
    a: NumberExpressions<Scope>,
    b: NumberExpressions<Scope>,
): NumberExpressions<Scope> {
    return {
        type: 'op',
        op: '+',
        args: [a, b],
    };
}

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
