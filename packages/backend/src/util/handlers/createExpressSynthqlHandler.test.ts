import { beforeAll, describe, expect, test } from 'vitest';
import { createExpressSynthqlHandler } from './createExpressSynthqlHandler';
import { QueryEngine } from '../..';
import { getMockReq, getMockRes } from 'vitest-mock-express';

import { DB, from } from '../../tests/pagilaDb';

describe('createExpressSynthqlHandler', () => {
    let queryEngine: QueryEngine<DB>;

    beforeAll(async () => {
        queryEngine = new QueryEngine<DB>({
            url: 'postgres://postgres:postgres@localhost:5432/postgres',
        });
    });

    test('Query execution is successful', async () => {
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

        expect(res.status).toBeCalledWith(200);

        expect(res.setHeader).toBeCalledWith(
            'Content-Type',
            'application/x-ndjson',
        );

        // expect(res.end).toHaveBeenCalledWith(
        //     'SynthQL request handled successfully!',
        // );
    });
});
