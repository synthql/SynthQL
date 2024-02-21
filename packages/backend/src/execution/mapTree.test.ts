import { describe, expect, test } from "vitest";
import { mapTree } from "./mapTree";
import { collectAsync } from "../util/collectAsync";

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
                children: node.children
            }
        })
        for await (const t of g) {
            expect(t.root).toMatchSnapshot()
        }
    })
})

