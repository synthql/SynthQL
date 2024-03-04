import { describe, expect, test } from "vitest";
import { mapTree } from "./mapTree";
import { collectAsync } from "./collectAsync";

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
                            children: []
                        }
                    ]
                },
                {
                    value: '3',
                    children: []
                }
            ]
        }
        const tree = {
            root: inputNode
        }

        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const g = mapTree(tree, async node => {
            await sleep(1)

            return {
                value: `mapped: ${node.value}`,
                children: []
            }
        })
        const collected = await collectAsync(g);

        expect(collected).toMatchInlineSnapshot(
            [
                {
                    "root": {
                        "children": [],
                        "value": "mapped: 1",
                    },
                },
                {
                    "root": {
                        "children": [
                            {
                                "children": [],
                                "value": "mapped: 2",
                            },
                            {
                                "children": [],
                                "value": "mapped: 3",
                            },
                        ],
                        "value": "mapped: 1",
                    },
                },
                {
                    "root": {
                        "children": [
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "value": "mapped: 4",
                                    },
                                ],
                                "value": "mapped: 2",
                            },
                            {
                                "children": [],
                                "value": "mapped: 3",
                            },
                        ],
                        "value": "mapped: 1",
                    },
                },
                {
                    "root": {
                        "children": [
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "value": "mapped: 4",
                                    },
                                ],
                                "value": "mapped: 2",
                            },
                            {
                                "children": [],
                                "value": "mapped: 3",
                            },
                        ],
                        "value": "mapped: 1",
                    },
                },
                {
                    "root": {
                        "children": [
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "value": "mapped: 4",
                                    },
                                ],
                                "value": "mapped: 2",
                            },
                            {
                                "children": [],
                                "value": "mapped: 3",
                            },
                        ],
                        "value": "mapped: 1",
                    },
                },
            ]
        )
    })
})

