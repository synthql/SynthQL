import { describe, expect, test } from 'vitest';
import { DB, schema } from '../generated';
import { getPrimaryKey } from './getPrimaryKey';

describe('getPrimaryKey', () => {
    test('Get the primary key for a table', () => {
        const primaryKey = getPrimaryKey<DB>(schema, 'actor');

        expect(primaryKey).toEqual('actor_id');
    });
});
