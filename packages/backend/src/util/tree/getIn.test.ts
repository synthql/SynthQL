import { describe, expect, test } from 'vitest';
import { getIn } from './getIn';
import { Path, star } from '../../execution/types';

describe('getIn', (i) => {
    const cases: Array<{ input: any; path: Path; output: any }> = [
        {
            input: {},
            path: [],
            output: [{}],
        },
        {
            input: [],
            path: [],
            output: [[]],
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
            output: [[1, 2, 3]],
        },
        {
            input: { a: { b: [1, 2, 3] } },
            path: ['a', 'b', 1],
            output: [2],
        },
        {
            input: { a: { b: [1, 2, 3] } },
            path: ['a', 'b', 3],
            output: [],
        },
        {
            input: [{ a: 1 }, { a: 2 }, { a: 3 }],
            path: [star, 'a'],
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
            path: [star, 'a', star, 'b'],
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
            path: [star, 'a', star, 'c'],
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
            path: [star, 'z'],
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
            path: [star],
            output: [
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
        },
        {
            input: undefined,
            path: [],
            output: [undefined],
        },
    ];

    test.each(cases)('getIn %p', ({ input, path, output }) => {
        const actual = getIn(input, path);
        expect(actual).toEqual(output);
    });
});
