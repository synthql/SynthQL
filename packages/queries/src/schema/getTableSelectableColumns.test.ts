import { describe, expect, test } from 'vitest';
import { DB, schema } from '../generated';
import { getTableSelectableColumns } from './getTableSelectableColumns';

describe('getTableSelectableColumns', () => {
    test('Get all the selectable columns for a table', () => {
        const select = getTableSelectableColumns<DB>(schema, 'actor');

        expect(select).toEqual({
            actor_id: true,
            first_name: true,
            last_name: true,
            last_update: true,
        });
    });
});
