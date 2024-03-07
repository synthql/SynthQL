import { describe, expect, test } from "vitest";
import { ColumnRef } from "./ColumnRef";

describe('ColumnRef', () => {
    test('canonical ', () => {
        expect(ColumnRef.parse("a.b", 'public').canonical()).toEqual(`"public"."a"."b"`)
    })

    test('parsing', () => {
        expect(() => ColumnRef.parse("a", 'public')).toThrow()

        expect(() => ColumnRef.parse("_a", 'public')).toThrow()

        expect(() => ColumnRef.parse("a.b.c.d", 'public')).toThrow()
    })


})