import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import {
    type ExpressSynthqlHandler,
    createExpressSynthqlHandler,
} from './createExpressSynthqlHandler';
import { queryEngine } from '../../tests/queryEngine';
import { getMockReq, getMockRes } from 'vitest-mock-express';
import { DB } from '../../tests/db';
const from = query<DB>().from;

import { HttpServer, createHttpServer } from '../../tests/createHttpServer';
import { query } from '@synthql/queries';

describe('createExpressSynthqlHandler', () => {
    let httpServer: HttpServer;
    let handler: ExpressSynthqlHandler;

    beforeAll(async () => {
        handler = await createExpressSynthqlHandler<DB>(queryEngine);

        // httpServer = await createHttpServer(handler);
    });

    afterAll(() => {
        // httpServer?.server.close();
    });

    test(`Query execution is successful`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .groupingId('actor_id')
            .where({ actor_id: { in: [1] } })
            .one();

        // Mock Express request object
        const request = {
            method: 'POST',
            url: '/synthql',
            body: JSON.stringify(q),
        };

        const req = getMockReq(request);
        const { res } = getMockRes();

        handler(req, res);

        expect(req.body).toEqual(request.body);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.setHeader).toHaveBeenCalledWith(
            'Content-Type',
            'application/x-ndjson',
        );

        expect(res.write).toHaveBeenCalledWith(expect.stringContaining('\n'));

        expect(res.end).toHaveBeenCalled();
    });

    test(`Query execution is successful with returnLastOnly passed`, async () => {
        const handler = await createExpressSynthqlHandler<DB>(queryEngine);

        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .groupingId('actor_id')
            .where({ actor_id: { in: [1] } })
            .maybe();

        // Mock Express request object
        const request = {
            method: 'POST',
            url: '/synthql',
            body: JSON.stringify(q),
            headers: {
                'x-return-last-only': 'true',
            },
        };

        const req = getMockReq(request);
        const { res } = getMockRes();

        handler(req, res);

        expect(req.headers['x-return-last-only']).toEqual(
            request.headers['x-return-last-only'],
        );

        expect(req.body).toEqual(request.body);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.setHeader).toHaveBeenCalledWith(
            'Content-Type',
            'application/x-ndjson',
        );

        expect(res.write).toHaveBeenCalledWith(expect.stringContaining('\n'));

        expect(res.end).toHaveBeenCalled();
    });
});
