import { describe, expect, it, test } from 'vitest';
import { mapTree } from './mapTree';
import { collectAsync } from './collectAsync';
import { NumNode, StrNode, n, s } from '../tests/numNode';
import { collectLast } from '..';

describe('mapTree', () => {
    test('identity', async () => {
        const inputNode = {
            value: '1',
            children: [
                {
                    value: '2',
                    children: [
                        {
                            value: '4',
                            children: [],
                        },
                    ],
                },
                {
                    value: '3',
                    children: [],
                },
            ],
        };
        const tree = {
            root: inputNode,
        };

        function sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        const g = mapTree(tree, async (node) => {
            await sleep(1);

            return {
                value: `mapped: ${node.value}`,
                children: [],
            };
        });
        const collected = await collectAsync(g);

        expect(collected).toMatchInlineSnapshot([
            {
                root: {
                    children: [],
                    value: 'mapped: 1',
                },
            },
            {
                root: {
                    children: [
                        {
                            children: [],
                            value: 'mapped: 2',
                        },
                        {
                            children: [],
                            value: 'mapped: 3',
                        },
                    ],
                    value: 'mapped: 1',
                },
            },
            {
                root: {
                    children: [
                        {
                            children: [
                                {
                                    children: [],
                                    value: 'mapped: 4',
                                },
                            ],
                            value: 'mapped: 2',
                        },
                        {
                            children: [],
                            value: 'mapped: 3',
                        },
                    ],
                    value: 'mapped: 1',
                },
            },
            {
                root: {
                    children: [
                        {
                            children: [
                                {
                                    children: [],
                                    value: 'mapped: 4',
                                },
                            ],
                            value: 'mapped: 2',
                        },
                        {
                            children: [],
                            value: 'mapped: 3',
                        },
                    ],
                    value: 'mapped: 1',
                },
            },
            {
                root: {
                    children: [
                        {
                            children: [
                                {
                                    children: [],
                                    value: 'mapped: 4',
                                },
                            ],
                            value: 'mapped: 2',
                        },
                        {
                            children: [],
                            value: 'mapped: 3',
                        },
                    ],
                    value: 'mapped: 1',
                },
            },
        ]);
    });

    describe('should link parents', async () => {
        const cases: Array<{ input: NumNode; expected: StrNode }> = [
            { input: n(1), expected: s('1') },
            { input: n(1, n(2)), expected: s('1', s('1.2')) },
            { input: n(1, n(2), n(3)), expected: s('1', s('1.2'), s('1.3')) },
            {
                input: n(1, n(2, n(3))),
                expected: s('1', s('1.2', s('1.2.3'))),
            },

            {
                input: n(1, n(2, n(3)), n(4)),
                expected: s('1', s('1.2', s('1.2.3')), s('1.4')),
            },
            {
                input: n(1, n(2, n(3), n(4)), n(5)),
                expected: s('1', s('1.2', s('1.2.3'), s('1.2.4')), s('1.5')),
            },
            {
                input: n(1, n(2, n(3), n(4), n(5)), n(6)),
                expected: s('1', s('1.2', s('1.2.3'), s('1.2.4'), s('1.2.5')), s('1.6')),
            },

            {
                input: n(1, n(2), n(2), n(2), n(2)),
                expected: s('1', s('1.2'), s('1.2'), s('1.2'), s('1.2')),
            },

            {
                input: n(1, n(2, n(3), n(3), n(3)), n(2, n(3), n(3), n(3)), n(2, n(3), n(3), n(3))),
                expected: s(
                    '1',
                    s('1.2', s('1.2.3'), s('1.2.3'), s('1.2.3')),
                    s('1.2', s('1.2.3'), s('1.2.3'), s('1.2.3')),
                    s('1.2', s('1.2.3'), s('1.2.3'), s('1.2.3')),
                ),
            }
        ];

        test.each(cases)('case %#', async ({ input, expected }) => {
            const tree = { root: input };
            const outTree = await collectLast(
                mapTree<NumNode, StrNode>(
                    tree,
                    async (inputNode, parentNode) => {


                        return s(
                            [parentNode?.value, inputNode.value]
                                .filter(Boolean)
                                .join('.'),
                        );
                    },
                ),
            );
            expect(outTree).toMatchObject({ root: expected });
        });
    });
});
