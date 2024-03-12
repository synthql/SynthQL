import { Column, Table } from '..';
import { Exp, Primitive } from './Expression';

export function equals<Context>(
    exp1: Exp<Context>,
    exp2: Exp<Context>,
): Exp<Context> {
    return ['=', exp1, exp2];
}

export function isPositive<Context>(exp: Exp<Context>): Exp<Context> {
    return ['>', exp, 0];
}

export function isNegative<Context>(exp: Exp<Context>): Exp<Context> {
    return ['<', exp, 0];
}

export function isZero<Context>(exp: Exp<Context>): Exp<Context> {
    return ['=', exp, 0];
}

export function coalesce<Context>(
    exp: Exp<Context>,
    def: Exp<Context>,
): Exp<Context> {
    return ['>invoke', 'coalesce', exp, def];
}

export function isNotNull<Context>(exp: Exp<Context>): Exp<Context> {
    return ['is not', exp, null];
}

export function isNull<Context>(exp: Exp<Context>): Exp<Context> {
    return ['is', exp, null];
}

export function sum<Context>(exp: Exp<Context>): Exp<Context> {
    return ['>invoke', 'sum', exp];
}

export function param<Context, TParam extends Primitive>(
    param: TParam,
): Exp<Context> {
    return ['>param', param];
}

export function literal<Context, TParam extends Primitive>(
    param: TParam,
): Exp<Context> {
    return ['>literal', param];
}

export function when<Context, TReturn>(
    condition: Exp<Context>,
    whenTrue: Exp<Context>,
    whenFalse: Exp<Context>,
): Exp<Context> {
    return ['>when', condition, whenTrue, whenFalse];
}

export const cast = {
    asText: <Context>(exp: Exp<Context>): Exp<Context> => {
        return ['>::', exp, 'text'];
    },
    asNumeric: <Context>(exp: Exp<Context>): Exp<Context> => {
        return ['>::', exp, 'numeric'];
    },
    asInteger: <Context>(exp: Exp<Context>): Exp<Context> => {
        return ['>::', exp, 'integer'];
    },
    asUuid: <Context>(exp: Exp<Context>): Exp<Context> => {
        return ['>::', exp, 'uuid'];
    },
};

export const json = {
    get: <Context>(exp: Exp<Context>, key: string): Exp<Context> => {
        return ['->', exp, literal<Context, string>(key)];
    },
    getAsText: <Context>(exp: Exp<Context>, key: string): Exp<Context> => {
        return ['->>', exp, literal<Context, string>(key)];
    },
    getAsNumeric: <Context>(exp: Exp<Context>, key: string): Exp<Context> => {
        const jsonText = json.getAsText(exp, key);
        const withDefault = coalesce<Context>(jsonText, literal('0'));
        return cast.asNumeric(withDefault);
    },
    agg: <Context>(exp: Exp<Context>): Exp<Context> => {
        return ['>invoke', 'json_agg', exp];
    },
    buildObject: <Context>(...exp: Exp<Context>[]): Exp<Context> => {
        return ['>invoke', 'json_build_object', ...exp];
    },
};

export function distinct<Context>(exp: Exp<Context>): Exp<Context> {
    return ['>invoke', 'distinct', exp];
}

export function count<Context>(exp: Exp<Context>): Exp<Context> {
    return ['>invoke', 'count', exp];
}

export const jsonb = {
    buildObject: <Context>(...exp: Exp<Context>[]): Exp<Context> => {
        return ['>invoke', 'jsonb_build_object', ...exp];
    },
    agg: <Context>(exp: Exp<Context>): Exp<Context> => {
        return ['>invoke', 'jsonb_agg', exp];
    },
};

export function chain<Context>(
    exp: Exp<Context>,
    ...fns: Array<<Context>(exp: Exp<Context>) => Exp<Context>>
): Exp<Context> {
    return fns.reduce((acc, fn): Exp<Context> => {
        return fn(acc);
    }, exp);
}
