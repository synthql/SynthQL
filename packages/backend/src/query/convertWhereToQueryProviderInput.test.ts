import { describe, expect, test } from 'vitest';
import { DB, from } from '../tests/generated';
import { convertWhereToQueryProviderInput } from './convertWhereToQueryProviderInput';
import { Table, BINARY_OPERATORS } from '@synthql/queries';

describe('convertWhereToQueryProviderInput', () => {
    const q = from('actor').one();
    const q2 = from('staff').one();

    const date = new Date().toISOString();

    const successCases = [
        // { column: value }
        {
            from: q.from,
            where: { actor_id: 1 },
            result: {
                actor_id: [1],
            },
        },

        // { column: in: { [value1]}}
        {
            from: q.from,
            where: { actor_id: { in: [1] } },
            result: {
                actor_id: [1],
            },
        },

        // { column: '= any': { [value1]}}
        {
            from: q.from,
            where: { actor_id: { '= any': [1] } },
            result: {
                actor_id: [1],
            },
        },

        // Empty query
        {
            from: q2.from,
            where: {},
            result: {},
        },

        // Boolean column query
        {
            from: q2.from,
            where: { active: true },
            result: {
                active: [true],
            },
        },

        // Date column query
        {
            from: q2.from,
            where: { last_update: date },
            result: {
                last_update: [date],
            },
        },

        // Mutiple columns query
        {
            from: q2.from,
            where: { address_id: 1, store_id: 2 },
            result: {
                address_id: [1],
                store_id: [2],
            },
        },

        // Combination multiple columns
        {
            from: q2.from,
            where: { address_id: { 'in': [1], '= any': [2] } },
            result: {
                address_id: [1, 2],
            },
        },
    ];

    test.each(successCases)(
        'where cases that should convert safely',
        ({ from, where, result }) => {
            expect(
                convertWhereToQueryProviderInput<DB, Table<DB>>(from, where),
            ).toEqual(result);
        },
    );

    const ibo = BINARY_OPERATORS.filter((op) => op !== 'in');

    const iboCases = ibo.map((op) => {
        return { from: q.from, where: { actor_id: { [op]: 1 } } };
    });

    const failureCases = [...iboCases];

    test.each(failureCases)(
        'where cases that should throw an error',
        ({ from, where }) => {
            expect(() =>
                convertWhereToQueryProviderInput<DB, Table<DB>>(from, where),
            ).toThrowError(`
                Invalid query passed to "${from}" QueryProvider!

                You are trying to pass the following 'where' clause to the "${from}" QueryProvider:

                    ${JSON.stringify(where)}

                This 'where' clause is not supported by QueryProvider. 
                    We currently only support clauses of the form:

                    {column: value}
                    {column: {in: [value1, value2, ...]}}
                    {column: {'= any': [value1, value2, ...]}}
    `);
        },
    );
});
