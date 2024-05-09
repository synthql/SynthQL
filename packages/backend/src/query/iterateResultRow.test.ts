import { describe, expect, test } from 'vitest';
import { iterateResultRows } from './iterateResultRow';
import { city } from '../tests/queries.v2';
import { QueryResult, col } from '@synthql/queries';
import { DB } from '../tests/generated';

describe('iterateResultRow', () => {
    test('iterateResultRow', () => {
        const q = city()
            .where({ city_id: col('address.city_id') })
            .many();

        const queryResult: QueryResult<DB, typeof q> = [
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
