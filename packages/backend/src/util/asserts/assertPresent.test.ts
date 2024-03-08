import { describe, expect, test, } from "vitest";
import { assertPresent } from "./assertPresent";

describe('assertPresent', () => {
    test('throws', () => {
        expect(() => assertPresent(null)).toThrow();
        expect(() => assertPresent(undefined)).toThrow();
        expect(assertPresent('')).toBeUndefined()
        expect(assertPresent(0)).toBeUndefined()
        expect(assertPresent(1234)).toBeUndefined()
        expect(assertPresent(-1)).toBeUndefined()
    })
})