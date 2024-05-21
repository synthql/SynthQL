import { describe, expect, test } from 'vitest';
import { DB, schema } from './generated';
import { getSelectableColumns } from './getSelectableColumns';

describe('getSelectableColumns', () => {
    test('Get all the selectable columns for a table', () => {
        const select = getSelectableColumns<DB>(schema, 'actor');

        expect(select).toEqual({
            actor_id: true,
            first_name: true,
            last_name: true,
            last_update: true,
        });
    });
});
