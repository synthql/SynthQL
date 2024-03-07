import { describe, expect, test, } from "vitest";
import { assertHasKeyAtPath } from "./assertHasKeyAtPath";

describe('assertHasKeyAtPath', () => {
    test('assertHasKeyAtPath', () => {
        expect(() => assertHasKeyAtPath({}, [], 'a')).toThrow();
        expect(() => assertHasKeyAtPath([], [], 'a')).toThrow();
        expect(() => assertHasKeyAtPath(1, [], 'a')).toThrow();
        expect(() => assertHasKeyAtPath("", [], 'a')).toThrow();
        expect(() => assertHasKeyAtPath("a", [], 'a')).toThrow();
        expect(() => assertHasKeyAtPath({ 1: 1 }, [], 'a')).toThrow();
        expect(assertHasKeyAtPath({ a: 1 }, [], 'a')).toBeUndefined()
        expect(assertHasKeyAtPath({ a: {} }, [], 'a')).toBeUndefined()
    })
})