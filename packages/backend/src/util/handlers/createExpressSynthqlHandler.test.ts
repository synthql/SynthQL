import { describe, expect, test, vi } from 'vitest';
import type { Response } from 'express';

import { DB, from } from '../../tests/generated';
import {
    ExpressSynthqlHandlerRequest,
    ExpressSynthqlHandlerResponse,
    createExpressSynthqlHandler,
} from './createExpressSynthqlHandler';
import { queryEngine } from '../../tests/queryEngine';

describe('createExpressSynthqlHandler', () => {
    test(`Well-formed and valid query execution is successful with no headers passed `, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 1 })
            .one();

        const handler = createExpressSynthqlHandler<DB>(queryEngine);

        const req = initReq(q);

        const res = initRes();

        const responseWriteSpy = vi.spyOn(res, 'write');

        await handler(req, res);

        expect(responseWriteSpy).toHaveBeenCalled(); // TODO Change to toHaveBeenLastCalledWith
        expect(res.statusCode).toBe(200);

        const newReq = initReq(q);

        const newRes = initRes();

        expect(async () => await handler(newReq, newRes)).not.toThrow();
    });

    test(`Well-formed and valid query execution is successful with 'returnLastOnly: true' header passed`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 2 })
            .one();

        const handler = createExpressSynthqlHandler<DB>(queryEngine);

        const req = initReq(q, true);

        const res = initRes();

        const responseWriteSpy = vi.spyOn(res, 'write');

        await handler(req, res);

        expect(responseWriteSpy).toHaveBeenCalled(); // TODO Change to toHaveBeenLastCalledWith
        expect(res.statusCode).toBe(200);

        const newReq = initReq(q, true);

        const newRes = initRes();

        expect(async () => await handler(newReq, newRes)).not.toThrow();
    });

    test(`Well-formed and valid query execution is successful with 'returnLastOnly: false' header passed`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 3 })
            .one();

        const handler = createExpressSynthqlHandler<DB>(queryEngine);

        const req = initReq(q, false);

        const res = initRes();

        const responseWriteSpy = vi.spyOn(res, 'write');

        await handler(req, res);

        expect(responseWriteSpy).toHaveBeenCalled(); // TODO Change to toHaveBeenLastCalledWith
        expect(res.statusCode).toBe(200);

        const newReq = initReq(q, false);

        const newRes = initRes();

        expect(async () => await handler(newReq, newRes)).not.toThrow();
    });

    test(`Malformed query returns expected JSON parsing error`, async () => {
        const q = "{ name: 'John', age: 30 }";

        const handler = createExpressSynthqlHandler<DB>(queryEngine);

        const req = {
            body: q,
            headers: {},
        };

        const res = initRes();

        const responseWriteSpy = vi.spyOn(res, 'write');

        await handler(req, res);

        expect(responseWriteSpy).toHaveBeenCalled(); // TODO Change to toHaveBeenLastCalledWith
        expect(res.statusCode).toBe(400);

        const newReq = {
            body: q,
            headers: {},
        };

        const newRes = initRes();

        expect(async () => await handler(newReq, newRes)).not.toThrow();
    });

    test(`Well-formed but invalid query object returns expected SQL execution error`, async () => {});

    test(`Well-formed but invalid query object returns expected response streaming error`, async () => {});
});

function initReq(
    query: any,
    returnLastOnly?: boolean,
): ExpressSynthqlHandlerRequest {
    return {
        body: JSON.stringify(query),
        headers:
            returnLastOnly === true
                ? {
                      'x-return-last-only': 'true',
                  }
                : returnLastOnly === false
                  ? {
                        'x-return-last-only': 'false',
                    }
                  : {},
    };
}

function initRes(): ExpressSynthqlHandlerResponse {
    return {
        statusCode: 0,
        status: (code: number): Response<any, Record<string, any>> => {
            return {
                json: (body?: any) => {},
            } as any;
        },
        write: (
            chunk: any,
            arg1?: BufferEncoding | ((error: Error | null | undefined) => void),
            arg2?: (error: Error | null | undefined) => void,
        ): boolean => {
            return {} as boolean;
        },
        setHeader: (
            name: string,
            value: string | number | readonly string[],
        ): Response<any, Record<string, any>> => {
            return {} as any;
        },
        end: (
            cb?: (() => void) | undefined,
        ): Response<any, Record<string, any>> => {
            return {} as any;
        },
    } as const;
}
