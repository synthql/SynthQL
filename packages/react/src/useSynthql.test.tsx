import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { EchoServer, createEchoServer } from './test/createEchoServer';
import { renderHook } from '@testing-library/react-hooks';
import { useSynthql } from '.';
import { DB, from } from './test/fakedb';
import { Providers } from './test/Providers';
import React from 'react';

describe('useSynthql', () => {
    let echoServer: EchoServer | undefined;
    beforeAll(async () => {
        echoServer = await createEchoServer((req) => {
            return Object.values(req.where?.id.in).map((id) => {
                return { id, name: 'bob' };
            });
        });
    });
    afterAll(() => {
        echoServer?.server.close();
    });

    test('fetching a single result', async () => {
        const result = renderHook(
            () => {
                const q = from('users')
                    .select({ id: true, name: true })
                    .where({ id: { in: ['1'] } })
                    .many();

                return useSynthql<DB, 'users', typeof q>(q);
            },
            {
                wrapper: (props: React.PropsWithChildren) => {
                    return <Providers endpoint={echoServer?.url!} {...props} />;
                },
            },
        );

        await result.waitFor(() => result.result.current.data !== undefined);

        expect(result.result.current.data).toEqual([{ id: '1', name: 'bob' }]);
    }, /* 10 seconds */ 10_000);

    test('fetching 100 results', async () => {
        const count = 100;
        const ids = Array(count)
            .fill('0')
            .map((_, i) => String(i));

        const result = renderHook(
            () => {
                const q = from('users')
                    .select({ id: true, name: true })
                    .where({ id: { in: ids } })
                    .many();

                return useSynthql<DB, 'users', typeof q>(q);
            },
            {
                wrapper: (props: React.PropsWithChildren) => {
                    return <Providers endpoint={echoServer?.url!} {...props} />;
                },
            },
        );

        await result.waitFor(
            () => result.result.current.data?.length === count,
        );

        expect(result.result.current.data).toEqual(
            ids.map((id) => ({ id, name: 'bob' })),
        );
        expect(result.result.current.status).toEqual(`success`);
    }, 10_000);
});
