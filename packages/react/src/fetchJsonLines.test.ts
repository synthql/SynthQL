import { beforeAll, describe, expect, it } from "vitest";
import { fetchJsonLines } from "./fetchJsonLines"

import http from "http"
import { createEchoServer } from "./test/createEchoServer";

const port = 1234
const url = `http://localhost:${port}`

beforeAll(() => {

})

describe('fetchJsonl', () => {
    it('when fetching multiple lines', async () => {

        const { url } = await createEchoServer()

        const lines = [
            "hello world",
            Array(100_000).fill('aLKSJH1!@#$ADSF!±@#$X!WW'),
            "for you\n to read",
            "and for me to write",
        ];
        const result: string[] = []
        for await (const line of fetchJsonLines(url, {
            method: 'POST',
            body: JSON.stringify({
                lines
            })
        })) {
            result.push(line)
        }
        expect(result).toEqual(lines)
    })

    it('when fetching zero lines', async () => {

        const { url } = await createEchoServer()

        const lines: string[] = [
        ];
        const result: string[] = []
        for await (const line of fetchJsonLines(url, {
            method: 'POST',
            body: JSON.stringify({
                lines
            })
        })) {
            result.push(line)
        }
        expect(result).toEqual(lines)
    })
})