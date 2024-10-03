import { describe, expect, test } from 'vitest';
import { compareJoins } from './compareJoins';
import { Join } from './types';
import { TableRef } from '../../../../refs/TableRef';

describe('compareJoins', () => {
    test('ordering', () => {
        const store = TableRef.parse('store', 'public');
        const person = TableRef.parse('person', 'public');
        const pet = TableRef.parse('pet', 'public');

        const joins: Join[] = [
            {
                table: person,
                conditions: [
                    {
                        op: '=',
                        ownColumn: person.column('id'),
                        otherColumn: store.column('manager_id'),
                    },
                ],
                where: {},
            },
            {
                table: pet,
                conditions: [
                    {
                        op: '=',
                        ownColumn: pet.column('owner_id'),
                        otherColumn: person.column('id'),
                    },
                ],
                where: {},
            },
            {
                table: pet,
                conditions: [
                    {
                        op: '=',
                        ownColumn: pet.column('owner_id'),
                        otherColumn: person.column('id'),
                    },
                ],
                where: {},
            },
        ];

        const shuffled = shuffle(joins);

        expect(Array.from(shuffled).sort(compareJoins)).toEqual(joins);
        expect(Array.from(shuffled).sort((a, b) => compareJoins(b, a))).toEqual(
            Array.from(joins).reverse(),
        );
    });
});

function shuffle<T>(array: T[]): T[] {
    const remaining = [...array];

    const result: T[] = [];
    while (remaining.length > 0) {
        const index = Math.floor(Math.random() * remaining.length);
        result.push(remaining[index]);
        remaining.splice(index, 1);
    }

    return result;
}
