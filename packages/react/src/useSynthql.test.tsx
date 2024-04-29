import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { EchoServer, createEchoServer } from './test/createEchoServer';
import { PagilaServer, createPagilaServer } from './test/createPagilaServer';
import { renderHook } from '@testing-library/react-hooks';
import { useSynthql } from '.';
import { DB, from } from './test/fakedb';
import { DB as PagilaDB, from as fromPagila } from './test/db';
import { Providers } from './test/Providers';
import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { QueryEngine } from '@synthql/backend';

describe('useSynthql', () => {
    let echoServer: EchoServer | undefined;
    let pagilaServer: PagilaServer | undefined;

    beforeAll(async () => {
        echoServer = await createEchoServer((req) => {
            return Object.values(req.where?.id.in).map((id) => {
                return { id, name: 'bob' };
            });
        });

        const queryEngine = new QueryEngine({
            url: 'postgres://postgres:postgres@localhost:5432/postgres',
        });

        pagilaServer = await createPagilaServer({ queryEngine });
    });

    afterAll(() => {
        echoServer?.server.close();
        pagilaServer?.server.close();
    });

    test('Fetching a single result', async () => {
        const result = renderHook(
            () => {
                // @@start-example@@ Find a single user via id using `select()`
                // @@desc@@ Finds 0 or 1 record(s) in the `user` table where the `id` is in the list of ids.

                const q = from('users')
                    .select({ id: true, name: true })
                    .where({ id: { in: ['1'] } })
                    .maybe();

                return useSynthql<DB, 'users', typeof q>(q);

                // @@end-example@@
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

    test('Fetching 100 results', async () => {
        const count = 100;
        const ids = Array(count)
            .fill('0')
            .map((_, i) => String(i));

        const result = renderHook(
            () => {
                // @@start-example@@ Find all users with ids in the list using `select()`
                // @@desc@@ Finds 0 or n records in the `users` table where their `id` is in the list of ids.

                const q = from('users')
                    .select({ id: true, name: true })
                    .where({ id: { in: ids } })
                    .many();

                const result: UseQueryResult<
                    Array<{ id: string; name: string }>
                > = useSynthql<DB, 'users', typeof q>(q);

                return result;

                // @@end-example@@
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

    test.skip('Fetching a single result from the Pagila database', async () => {
        const result = renderHook(
            () => {
                // @@start-example@@ Find a single actor via id using `columns()`
                // @@desc@@ Finds 0 or 1 record(s) in the `actors` table where the `id` is in the list of ids.

                const q = fromPagila('actor')
                    .columns('actor_id', 'first_name', 'last_name')
                    .groupingId('actor_id')
                    .where({ actor_id: { in: [1, 2] } })
                    .maybe();

                return useSynthql<PagilaDB, 'actor', typeof q>(q);

                // @@end-example@@
            },
            {
                wrapper: (props: React.PropsWithChildren) => {
                    return (
                        <Providers endpoint={pagilaServer?.url!} {...props} />
                    );
                },
            },
        );

        await result.waitFor(() => result.result.current.data !== undefined);

        console.log(result.result.current.data);

        expect(result.result.current.data).toEqual([
            { actor_id: 1, first_name: 'PENELOPE', last_name: 'GUINESS' },
        ]);
    }, /* 10 seconds */ 10_000);

    test.skip('Fetching 100 records from the Pagila database', async () => {
        const count = 100;
        const ids = Array(count)
            .fill(0)
            .map((_, i) => i);

        const result = renderHook(
            () => {
                // @@start-example@@ Find all actors with ids in the list using `columns()`
                // @@desc@@ Finds 0 or n records in the `actors` table where their `id` is in the list of ids.

                const q = fromPagila('actor')
                    .columns('actor_id', 'first_name', 'last_name')
                    .groupingId('actor_id')
                    .where({ actor_id: { in: ids } })
                    .many();

                return useSynthql<PagilaDB, 'actor', typeof q>(q);

                // @@end-example@@
            },
            {
                wrapper: (props: React.PropsWithChildren) => {
                    return (
                        <Providers endpoint={pagilaServer?.url!} {...props} />
                    );
                },
            },
        );

        await result.waitFor(() => result.result.current.data !== undefined);

        console.log(result.result.current.data);

        expect(result.result.current.data?.length).toEqual(100);
    }, /* 10 seconds */ 10_000);
});
