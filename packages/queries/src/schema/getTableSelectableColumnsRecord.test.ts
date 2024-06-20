import { describe, expect, test } from 'vitest';
import { DB, schema } from '../generated';
import { getTableSelectableColumnsRecord } from './getTableSelectableColumnsRecord';

describe('getTableSelectableColumnsRecord', () => {
    test('Get all the selectable columns for a table', () => {
        const select = getTableSelectableColumnsRecord<DB>(schema, 'actor');

        expect(select).toEqual({
            actor_id: true,
            first_name: true,
            last_name: true,
            last_update: true,
        });
    });
});
