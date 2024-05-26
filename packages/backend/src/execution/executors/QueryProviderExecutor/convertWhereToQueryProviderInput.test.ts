import { describe, expect, test } from 'vitest';
import { convertWhereToQueryProviderInput } from './convertWhereToQueryProviderInput';
import { DB } from '../../../tests/generated';
import { Table } from '@synthql/queries';
import { not } from '../PgExecutor/queryBuilder/exp';

describe('convertWhereToQueryProviderInput', () => {
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
    ];

    describe('supported where clauses', () => {
        test.each(supportedCases)(
            'convertWhereToQueryProviderInput(%o) should return %o',
            (where, expected) => {
                const result = convertWhereToQueryProviderInput<DB, Table<DB>>(
                    'actor',
                    where,
                );

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
    ];

    describe('unsupported where clauses', () => {
        test.each(unsupportedCases)(
            'convertWhereToQueryProviderInput(%o) should throw an error',
            (where) => {
                expect(() =>
                    convertWhereToQueryProviderInput<DB, Table<DB>>(
                        'actor',
                        where,
                    ),
                ).toThrow();
            },
        );
    });
});
