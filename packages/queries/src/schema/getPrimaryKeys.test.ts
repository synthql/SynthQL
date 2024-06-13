import { describe, expect, test } from 'vitest';
import { DB, schema } from '../generated';
import { getPrimaryKeys } from './getPrimaryKeys';

describe('getPrimaryKey', () => {
    test('Get the primary keys for a table', () => {
        const primaryKeys = getPrimaryKeys<DB>(schema, 'actor');

        expect(primaryKeys).toEqual(['actor_id']);
    });
});
