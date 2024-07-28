import { Exp, NumberExpressions } from './Exp';

export function count<Scope>(a: Exp): NumberExpressions<Scope> {
    return {
        type: 'fn',
        fn: 'count',
        args: [a],
    };
}
