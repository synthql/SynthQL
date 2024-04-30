import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { EchoServer, createEchoServer } from './test/createEchoServer';
import { PagilaServer, createPagilaServer } from './test/createPagilaServer';
import { renderHook } from '@testing-library/react-hooks';
import { useSynthql } from '.';
import { DB, from } from './test/fakedb';
import { DB as PagilaDB, from as fromPagila } from './test/db';
import { Providers } from './test/Providers';
import React from 'react';
import { QueryEngine } from '@synthql/backend';
import { col } from '@synthql/queries';

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

    test('Fetching 0 or 1 row(s)', async () => {
        const result = renderHook(
            () => {
                // @@start-example@@ Find a single user by id using `select()`
                // @@desc@@ Finds 0 or 1 record(s) in the `user` table where the `id` is in the list of ids.

                const q = from('users')
                    .select({ id: true, name: true })
                    .where({ id: { in: ['1'] } })
                    .maybe();

                const result = useSynthql<DB, 'users', typeof q>(q);

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

        expect(result.result.current.data).toEqual({ id: '1', name: 'bob' });
    }, /* 10 seconds */ 10_000);

    test('Fetching 0 or 1 rows(s) from the Pagila database  with `columns()`', async () => {
        const result = renderHook(
            () => {
                // @@start-example@@ Find a single actor via id using `columns()`
                // @@desc@@ Finds 0 or 1 record(s) in the `actors` table where the `id` is in the list of ids.

                const q = fromPagila('actor')
                    .columns('actor_id', 'first_name', 'last_name')
                    .groupingId('actor_id')
                    .where({ actor_id: { in: [1] } })
                    .maybe();

                const result = useSynthql<PagilaDB, 'actor', typeof q>(q);

                // @@end-example@@

                return result;
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

        expect(result.result.current.data).toEqual({
            actor_id: 1,
            first_name: 'PENELOPE',
            last_name: 'GUINESS',
        });
    }, /* 10 seconds */ 10_000);

    test('Fetching n rows from the Pagila database  with `columns()`', async () => {
        const count = 10;
        const ids = Array(count)
            .fill(0)
            .map((_, i) => i + 1);

        const result = renderHook(
            () => {
                // @@start-example@@ Find all actors by ids using `columns()`
                // @@desc@@ Finds all the records in the `actors` table where their `id` is in the list of ids.

                const q = fromPagila('actor')
                    .columns('actor_id', 'first_name', 'last_name')
                    .groupingId('actor_id')
                    .where({ actor_id: { in: ids } })
                    .many();

                const result = useSynthql<PagilaDB, 'actor', typeof q>(q);

                // @@end-example@@

                return result;
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

        expect(result.result.current.data?.sort((a, b) => a.actor_id - b.actor_id)).toMatchInlineSnapshot(`
          [
            {
              "actor_id": 1,
              "first_name": "PENELOPE",
              "last_name": "GUINESS",
            },
            {
              "actor_id": 2,
              "first_name": "NICK",
              "last_name": "WAHLBERG",
            },
            {
              "actor_id": 3,
              "first_name": "ED",
              "last_name": "CHASE",
            },
            {
              "actor_id": 4,
              "first_name": "JENNIFER",
              "last_name": "DAVIS",
            },
            {
              "actor_id": 5,
              "first_name": "JOHNNY",
              "last_name": "LOLLOBRIGIDA",
            },
            {
              "actor_id": 6,
              "first_name": "BETTE",
              "last_name": "NICHOLSON",
            },
            {
              "actor_id": 7,
              "first_name": "GRACE",
              "last_name": "MOSTEL",
            },
            {
              "actor_id": 8,
              "first_name": "MATTHEW",
              "last_name": "JOHANSSON",
            },
            {
              "actor_id": 9,
              "first_name": "JOE",
              "last_name": "SWANK",
            },
            {
              "actor_id": 10,
              "first_name": "CHRISTIAN",
              "last_name": "GABLE",
            },
          ]
        `)
    }, /* 10 seconds */ 10_000);

    test('Fetching a single result from the Pagila database with single-level-deep nested data', async () => {
        const result = renderHook(
            () => {
                // @@start-example@@ Find a single actor via id with a single-level-deep`include()``
                // @@desc@@ Finds 1 record in the `customers` table where the `id` is in the list of ids.

                const store = fromPagila('store')
                    .columns('store_id', 'address_id', 'manager_staff_id')
                    .groupingId('store_id')
                    .where({
                        store_id: col('customer.store_id'),
                    })
                    .one();

                const q = fromPagila('customer')
                    .columns(
                        'customer_id',
                        'store_id',
                        'first_name',
                        'last_name',
                        'email',
                    )
                    .groupingId('customer_id')
                    .where({ customer_id: { in: [1] } })
                    .include({ store })
                    .one();

                const result = useSynthql<PagilaDB, 'customer', typeof q>(q);

                // @@end-example@@

                return result;
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

        expect(result.result.current.data).toEqual({
            customer_id: 1,
            store_id: 1,
            first_name: 'MARY',
            last_name: 'SMITH',
            email: 'MARY.SMITH@sakilacustomer.org',
            store: {
                store_id: 1,
                address_id: 129,
                manager_staff_id: 1,
            },
        });
    }, /* 10 seconds */ 10_000);

    test('Fetching a single result from the Pagila database with two-level-deep nested data', async () => {
        const result = renderHook(
            () => {
                // @@start-example@@ Find a single customer via id with a two-level-deep `include()`
                // @@desc@@ Finds 1 record in the `customers` table where the `id` is in the list of ids.

                const address = fromPagila('address')
                    .columns('address_id', 'address', 'district')
                    .groupingId('address_id')
                    .where({
                        address_id: col('store.address_id'),
                    })
                    .one();

                const store = fromPagila('store')
                    .columns('store_id', 'address_id', 'manager_staff_id')
                    .groupingId('store_id')
                    .where({
                        store_id: col('customer.store_id'),
                    })
                    .include({ address })
                    .one();

                const q = fromPagila('customer')
                    .columns(
                        'customer_id',
                        'store_id',
                        'first_name',
                        'last_name',
                        'email',
                    )
                    .groupingId('customer_id')
                    .where({ customer_id: { in: [4] } })
                    .include({ store })
                    .one();

                const result = useSynthql<PagilaDB, 'customer', typeof q>(q);

                // @@end-example@@

                return result;
            },
            {
                wrapper: (props: React.PropsWithChildren) => {
                    return (
                        <Providers endpoint={pagilaServer?.url!} {...props} />
                    );
                },
            },
        );

        await result.waitFor(() => result.result.current.data?.store?.address !== undefined);

        expect(result.result.current.data).toEqual({
            customer_id: 4,
            store_id: 2,
            first_name: 'BARBARA',
            last_name: 'JONES',
            email: 'BARBARA.JONES@sakilacustomer.org',
            store: {
                store_id: 2,
                address_id: 12,
                manager_staff_id: 2,
                address: {
                    address_id: 12,
                    address: '478 Joliet Way',
                    district: 'Hamilton',
                },
            },
        });
    }, /* 10 seconds */ 10_000);
});
