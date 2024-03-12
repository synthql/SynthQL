import { describe, expect, test } from 'vitest';
import { assertArrayAtPath } from './assertArrayAtPath';

describe('assertArrayAtPath', () => {
    test('throws', () => {
        expect(() => assertArrayAtPath({}, ['a'])).toThrow();
    });
});
