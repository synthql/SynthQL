import { describe, expect, test, } from "vitest";
import { assertObject } from "./assertObject";

describe('assertObject', () => {
    test('throws', () => {
        expect(() => assertObject([], ['a'])).toThrow();
        expect(() => assertObject(1, ['a'])).toThrow();
        expect(() => assertObject("1234", ['a'])).toThrow();
        expect(() => assertObject(Symbol("asd"), ['a'])).toThrow();
    })
})