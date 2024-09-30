import {} from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { col } from '../../../tests/generated';
import { convertWhereToQueryProviderInput } from './convertWhereToQueryProviderInput';

describe('convertWhereToQueryProviderInput', () => {
    const date = new Date();

    const supportedCases: Array<[expectedWhere: any, actualWhere: any]> = [
        [{}, {}],
        [{ a: 1 }, { a: [1] }],
        [{ a: { in: [1, 2, 3] } }, { a: [1, 2, 3] }],
        [{ a: { '= any': [1, 2, 3] } }, { a: [1, 2, 3] }],
        [
            { a: { 'in': [1, 2, 3], '= any': [4, 5, 6] } },
            { a: [1, 2, 3, 4, 5, 6] },
        ],
        [{ a: null }, { a: [null] }],
        [{ a: undefined }, { a: [undefined] }],
        [{ a: { in: [null, undefined] } }, { a: [null, undefined] }],
        [
            { a: 1, b: 2 },
            { a: [1], b: [2] },
        ],
        [{ a: date }, { a: [date] }],
        [
            { a: true, b: false },
            { a: [true], b: [false] },
        ],
        [{ a: true }, { a: [true] }],
        [{ a: false }, { a: [false] }],
    ];

    describe('supported where clauses', () => {
        test.each(supportedCases)(
            'convertWhereToQueryProviderInput(%o) should return %o',
            (where, expected) => {
                const result = convertWhereToQueryProviderInput('actor', where);

                expect(result).toEqual(expected);
            },
        );
    });

    const unsupportedCases: Array<any> = [
        { a: { '>': 1 } },
        { a: { '<': 1 } },
        { a: { '>=': 1 } },
        { a: { '<=': 1 } },
        { a: { '!=': 1 } },
        { a: { like: 'a%' } },
        { a: { 'not like': 'a%' } },
        { a: { match: 'a%' } },
        { a: { ilike: 'a%' } },
        { a: 1, b: { not: 2 } },
        { a: col('b.a' as never) },
        { a: col('b.a' as never), b: 2 },
    ];

    describe('unsupported where clauses', () => {
        test.each(unsupportedCases)(
            'convertWhereToQueryProviderInput(%o) should throw an error',
            (where) => {
                expect(() =>
                    convertWhereToQueryProviderInput('actor', where),
                ).toThrow();
            },
        );
    });
});
