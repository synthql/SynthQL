import { QueryResult, col } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { city } from '../tests/queries.v2';
import { iterateResultRows } from './iterateResultRow';

describe('iterateResultRow', () => {
    test('iterateResultRow', () => {
        const q = city()
            .where({ city_id: col('address.city_id') })
            .many();

        const queryResult: QueryResult<typeof q> = [
            { city: 'Bogota', city_id: 1 },
            { city: 'Cali', city_id: 2 },
            { city: 'Medellin', city_id: 3 },
        ];

        expect(
            Array.from(iterateResultRows(queryResult, q, 'public')).map(
                ({ column, values }) => {
                    return {
                        column: column.canonical(),
                        values,
                    };
                },
            ),
        ).toEqual([
            {
                column: `"public"."city"."city_id"`,
                values: [1, 2, 3],
            },
            {
                column: `"public"."city"."city"`,
                values: ['Bogota', 'Cali', 'Medellin'],
            },
        ]);
    });
});
