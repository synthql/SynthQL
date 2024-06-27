import { describe, expect, test } from 'vitest';
import { DB, schema } from '../generated';
import { getTablePrimaryKeyColumns } from './getTablePrimaryKeyColumns';

describe('getTablePrimaryKeyColumns', () => {
    test('Get the primary keys for a table', () => {
        const primaryKeys = getTablePrimaryKeyColumns<DB>(schema, 'actor');

        expect(primaryKeys).toEqual(['actor_id']);
    });
});
