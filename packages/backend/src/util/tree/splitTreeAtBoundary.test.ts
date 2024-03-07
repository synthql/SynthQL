import { describe, expect, test } from "vitest";
import { Node } from "./mapTree";
import { splitTreeAtBoundary } from "./splitTreeAtBoundary";
import { NumNode, n } from "../../tests/numNode";



function generateRandomTree(value: number): NumNode {
    const shouldContinue = Math.random() > 0.5;

    if (!shouldContinue) {
        return n(value);
    }

    return n(value, generateRandomTree(value), generateRandomTree(value));
}

describe('splitAtBoundary', () => {





    const shouldSplit = (node: NumNode) => node.value === 0;

    const randomTree1 = generateRandomTree(1);
    const randomTree2 = generateRandomTree(2);
    const randomTree3 = generateRandomTree(3);

    const cases: Array<{
        input: NumNode,
        expected: {
            tree: NumNode,
            remaining: NumNode[]
        }
    }> = [
            {
                input: n(1),
                expected: {
                    tree: n(1),
                    remaining: []
                }
            },

            {
                input: n(0),
                expected: {
                    tree: n(0),
                    remaining: []
                }
            },

            {
                input: n(1, n(0)),
                expected: {
                    tree: n(1),
                    remaining: [n(0)]
                }
            },

            {
                input: n(1, n(2), n(0)),
                expected: {
                    tree: n(1, n(2)),
                    remaining: [n(0)]
                }
            },

            {
                input: n(1, n(2), n(3), n(0, n(5))),
                expected: {
                    tree: n(1, n(2), n(3)),
                    remaining: [n(0, n(5))]
                }
            },

            {
                input: n(1,
                    n(2),
                    n(3),
                    n(0,
                        n(5),
                        n(6),
                        n(7)
                    )
                ),
                expected: {
                    tree: n(1, n(2), n(3)),
                    remaining: [n(0, n(5), n(6), n(7))]
                }
            },
            {
                input: n(1),
                expected: {
                    tree: n(1),
                    remaining: []
                }
            },
            {
                input: n(1, n(2), n(3), n(4)),
                expected: {
                    tree: n(1, n(2), n(3), n(4)),
                    remaining: []
                }
            },
            {
                input: randomTree1,
                expected: {
                    tree: randomTree1,
                    remaining: []
                }
            },
            {
                input: randomTree2,
                expected: {
                    tree: randomTree2,
                    remaining: []
                }
            },
            {
                input: randomTree3,
                expected: {
                    tree: randomTree3,
                    remaining: []
                }
            }
        ]

    test.each(cases)('splitTreeAtBoundary %s', (c) => {
        expect(splitTreeAtBoundary(c.input, shouldSplit)).toEqual(c.expected)
    })
})

