import { describe, expect, test } from 'vitest';
import { getIn } from './getIn';
import { Path } from '../../execution/types';

describe('getIn', () => {
    const cases: Array<{ input: any; path: Path; output: any }> = [
        {
            input: {},
            path: [],
            output: [{}],
        },
        {
            input: [],
            path: [],
            output: [],
        },
        {
            input: [1, 2],
            path: [],
            output: [1, 2],
        },
        {
            input: { a: 1 },
            path: ['a'],
            output: [1],
        },
        {
            input: { a: { b: 1 } },
            path: ['a', 'b'],
            output: [1],
        },
        {
            input: { a: { b: { c: 1 } } },
            path: ['a', 'b', 'c'],
            output: [1],
        },
        {
            input: { a: { b: [1, 2, 3] } },
            path: ['a', 'b'],
            output: [1, 2, 3],
        },
        {
            input: [{ a: 1 }, { a: 2 }, { a: 3 }],
            path: ['a'],
            output: [1, 2, 3],
        },
        {
            input: [
                {
                    a: [
                        { a: 1, b: 1234 },
                        { a: 2, b: 2345 },
                    ],
                },
                {
                    a: [
                        { a: 3, b: 3456 },
                        { a: 4, b: 4567 },
                    ],
                },
            ],
            path: ['a', 'b'],
            output: [1234, 2345, 3456, 4567],
        },
        {
            input: [
                {
                    a: [
                        { a: 1, b: 1234 },
                        { a: 2, b: 2345 },
                    ],
                },
                {
                    a: [
                        { a: 3, b: 3456 },
                        { a: 4, b: 4567 },
                    ],
                },
            ],
            path: ['a', 'c'],
            output: [],
        },
        {
            input: [
                {
                    a: [
                        { a: 1, b: 1234 },
                        { a: 2, b: 2345 },
                    ],
                },
                {
                    a: [
                        { a: 3, b: 3456 },
                        { a: 4, b: 4567 },
                    ],
                },
            ],
            path: ['z'],
            output: [],
        },
        {
            input: [
                {
                    a: [
                        { a: 1, b: 12340000 },
                        { a: 2, b: 2345 },
                    ],
                },
                {
                    a: [
                        { a: 3, b: 3456 },
                        { a: 4, b: 4567 },
                    ],
                },
            ],
            path: [],
            output: [
                {
                    a: [
                        { a: 1, b: 12340000 },
                        { a: 2, b: 2345 },
                    ],
                },
                {
                    a: [
                        { a: 3, b: 3456 },
                        { a: 4, b: 4567 },
                    ],
                },
            ],
        },
        {
            input: undefined,
            path: [],
            output: [undefined],
        },
    ];

    test.each(cases)('getIn #%#', ({ input, path, output }) => {
        const actual = getIn(input, path);
        expect(actual).toEqual(output);
    });
});
