import { describe, expect, test } from 'vitest';
import { assertObject } from './asserts/assertObject';
import { assertPresent } from './asserts/assertPresent';
import { isObj } from './isObj';

describe('isObj', () => {
    test('isObj', () => {
        expect(isObj({})).toBe(true);
        expect(isObj([])).toBe(false);
        expect(isObj(null)).toBe(false);
        expect(isObj(undefined)).toBe(false);
        expect(isObj('')).toBe(false);
        expect(isObj(0)).toBe(false);
        expect(isObj(true)).toBe(false);
        expect(isObj(false)).toBe(false);
        expect(isObj(Symbol())).toBe(false);
        expect(isObj(() => {})).toBe(false);
    });
});
