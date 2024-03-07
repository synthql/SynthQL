import { describe, expect, test, } from "vitest";
import { assertHasKey } from "./assertHasKey";

describe('assertHasKey', () => {
    test('assertHasKey', () => {
        expect(() => assertHasKey({}, 'a')).toThrow();
        expect(() => assertHasKey([], 'a')).toThrow();
        expect(() => assertHasKey(1, 'a')).toThrow();
        expect(() => assertHasKey("", 'a')).toThrow();
        expect(() => assertHasKey("a", 'a')).toThrow();
        expect(() => assertHasKey({ 1: 1 }, 'a')).toThrow();
        expect(assertHasKey({ a: 1 }, 'a')).toBeUndefined()
        expect(assertHasKey({ a: {} }, 'a')).toBeUndefined()
    })
})