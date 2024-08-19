import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { fetchJsonLines } from './fetchJsonLines';
import { EchoServer, createEchoServer } from './test/createEchoServer';

describe('fetchJsonLines', () => {
    let echoServer: EchoServer | undefined;

    beforeAll(async () => {
        echoServer = await createEchoServer((reqBody) => {
            return reqBody.lines;
        });
    });

    afterAll(() => {
        echoServer?.server.close();
    });

    it('When fetching multiple lines', async () => {
        const lines = [
            'hello world',
            Array(100_000).fill('aLKSJH1!@#$ADSF!±@#$X!WW'),
            'for you\n to read',
            'and for me to write',
        ];

        const result: string[] = [];

        for await (const line of fetchJsonLines(echoServer?.url!, {
            method: 'POST',
            body: JSON.stringify({
                lines,
            }),
        })) {
            result.push(line);
        }

        expect(result).toEqual(lines);
    });

    it('When fetching zero lines', async () => {
        const lines: string[] = [];
        const result: string[] = [];

        for await (const line of fetchJsonLines(echoServer?.url!, {
            method: 'POST',
            body: JSON.stringify({
                lines,
            }),
        })) {
            result.push(line);
        }

        expect(result).toEqual(lines);
    });
});
