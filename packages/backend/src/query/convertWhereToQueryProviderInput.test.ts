import { describe, expect, test } from 'vitest';
import { DB, from } from '../tests/generated';
import { convertWhereToQueryProviderInput } from './convertWhereToQueryProviderInput';
import { Table } from '@synthql/queries';

describe('convertWhereToQueryProviderInput', () => {
    test(`{ column: value }`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .groupingId('actor_id')
            .where({ actor_id: 1 })
            .one();

        const result = convertWhereToQueryProviderInput<DB, Table<DB>>(
            q.from,
            q.where,
        );

        expect(result).toEqual({
            actor_id: [1],
        });
    });

    test(`{ column: in: { [value1, value2] } }`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .groupingId('actor_id')
            .where({ actor_id: { in: [1] } })
            .maybe();

        const result = convertWhereToQueryProviderInput<DB, Table<DB>>(
            q.from,
            q.where,
        );

        expect(result).toEqual({
            actor_id: [1],
        });
    });

    test(`{ column: '= any': { [value1, value2] } }`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .groupingId('actor_id')
            .where({ actor_id: { '= any': [1] } })
            .maybe();

        const result = convertWhereToQueryProviderInput<DB, Table<DB>>(
            q.from,
            q.where,
        );

        expect(result).toEqual({
            actor_id: [1],
        });
    });

    test(`Expect any other kind to error`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .groupingId('actor_id')
            .where({ actor_id: { '>=': 1 } })
            .maybe();

        expect(() =>
            convertWhereToQueryProviderInput<DB, Table<DB>>(q.from, q.where),
        ).toThrowError(`
                Invalid query passed to "${q.from}" QueryProvider!

                You are trying to pass the following 'where' clause to the "${q.from}" QueryProvider:

                    ${JSON.stringify(q.where)}

                This 'where' clause is not supported by QueryProvider. 
                    We currently only support clauses of the form:

                    {column: value}
                    {column: {in: [value1, value2, ...]}}
                    {column: {'= any': [value1, value2, ...]}}
    `);
    });
});
