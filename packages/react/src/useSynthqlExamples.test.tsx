import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { useSynthql } from '.';
import { EchoServer, createEchoServer } from './test/createEchoServer';
import { from } from './test/echoDb';
import { Providers } from './test/Providers';

describe('useSynthql test examples', () => {
    let echoServer: EchoServer | undefined;

    beforeAll(async () => {
        echoServer = await createEchoServer((req) => {
            return Object.values(req.where?.id.in).map((id) => {
                return { id, name: 'Bob', age: 1, active: true };
            });
        });
    });

    afterAll(() => {
        echoServer?.server.close();
    });

    test('Fetching 0 or 1 row(s)', async () => {
        const result = renderHook(
            () => {
                // @@start-example@@ Find a single user by id using `select()`
                // @@desc@@ Finds 0 or 1 record(s) in the `user` table where the `id` is in the list of ids

                const q = from('users')
                    .where({ id: { in: ['1'] } })
                    .maybe();

                const result = useSynthql(q);

                // @@end-example@@

                return result;
            },
            {
                wrapper: (props: React.PropsWithChildren) => {
                    return <Providers endpoint={echoServer?.url!} {...props} />;
                },
            },
        );

        await result.waitFor(() => result.result.current.data !== undefined);

        expect(result.result.current.data).toEqual({
            id: '1',
            name: 'Bob',
            age: 1,
            active: true,
        });
    }, 1000);
});
