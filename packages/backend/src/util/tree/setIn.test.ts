import { describe, expect, test } from 'vitest';
import { Path } from '../../execution/types';
import { setIn } from './setIn';

describe('setIn', (i) => {
    const thingToWrite = '!@#$';
    const cases: Array<{ input: any; path: Path; output: any }> = [
        {
            input: {},
            path: ['a'],
            output: { a: thingToWrite },
        },
        {
            input: { b: 1, a: 2 },
            path: ['a'],
            output: { b: 1, a: thingToWrite },
        },
        {
            input: [{}, {}, {}],
            path: ['a'],
            output: [
                { a: thingToWrite },
                { a: thingToWrite },
                { a: thingToWrite },
            ],
        },
        {
            input: { a: { b: [1, 2, 3] } },
            path: ['a', 'b'],
            output: { a: { b: thingToWrite } },
        },
        {
            input: [{ a: 1 }, { a: 2 }, { a: 3 }],
            path: ['b'],
            output: [
                { a: 1, b: thingToWrite },
                { a: 2, b: thingToWrite },
                { a: 3, b: thingToWrite },
            ],
        },
        {
            input: [{ a: [{ a: 1 }, { a: 2 }] }, { a: [{ a: 3 }, { a: 4 }] }],
            path: ['a', 'b'],
            output: [
                {
                    a: [
                        { a: 1, b: thingToWrite },
                        { a: 2, b: thingToWrite },
                    ],
                },
                {
                    a: [
                        { a: 3, b: thingToWrite },
                        { a: 4, b: thingToWrite },
                    ],
                },
            ],
        },
        {
            input: [{ a: [{ a: 1 }, { a: 2 }] }, { a: [{ a: 3 }, { a: 4 }] }],
            path: ['a'],
            output: [{ a: thingToWrite }, { a: thingToWrite }],
        },
        {
            input: [{ a: [{ a: 1 }, { a: 2 }] }, { a: [{ a: 3 }, { a: 4 }] }],
            path: ['a', 'a'],
            output: [
                { a: [{ a: thingToWrite }, { a: thingToWrite }] },
                { a: [{ a: thingToWrite }, { a: thingToWrite }] },
            ],
        },
    ];

    test.each(cases)('setIn #%#', ({ input, path, output }) => {
        const actual = setIn(
            structuredClone(input),
            path,
            (parent) => thingToWrite,
        );
        expect(actual).toEqual(output);
    });
});
