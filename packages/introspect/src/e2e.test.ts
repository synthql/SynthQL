import { describe, test } from 'vitest';
import { introspect } from '.';

describe('e2e', () => {
    test('generate from pagila', () => {
        introspect({
            connectionString:
                'postgres://postgres:password@localhost:5432/postgres',
        });
    });
});
