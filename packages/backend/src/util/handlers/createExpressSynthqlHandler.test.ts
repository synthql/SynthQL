import { describe, expect, test, vi } from 'vitest';
import type { Response } from 'express';

import { DB, from, schema } from '../../tests/generated';
import {
    ExpressSynthqlHandlerRequest,
    ExpressSynthqlHandlerResponse,
    createExpressSynthqlHandler,
} from './createExpressSynthqlHandler';
import { queryEngine } from '../../tests/queryEngine';
import { PgCatalogInt4, PgCatalogText } from '../../tests/generated/db';
import { query } from '@synthql/queries';
import { SynthqlError } from '../../SynthqlError';
import { composeQuery } from '../../execution/executors/PgExecutor/composeQuery';

interface DbWithVirtualTables extends DB {
    film_rating: {
        columns: {
            film_id: {
                type: PgCatalogInt4;
                selectable: true;
                includable: false;
                whereable: true;
                nullable: false;
                isPrimaryKey: true;
            };

            rating: {
                type: PgCatalogText;
                selectable: true;
                includable: false;
                whereable: false;
                nullable: false;
                isPrimaryKey: false;
            };
        };
    };
}

const schemaWithVirtualTables = {
    properties: {
        ...schema.properties,
        film_rating: {
            properties: {
                columns: {
                    properties: {
                        film_id: {
                            properties: {
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
                            },
                        },
                        rating: {
                            properties: {
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const fromWithVirtualTables = query<DbWithVirtualTables>(
    schemaWithVirtualTables,
).from;

describe('createExpressSynthqlHandler', () => {
    test(`Well-formed and valid query execution is successful with 'returnLastOnly: true' header passed`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 1 })
            .one();

        const handler = createExpressSynthqlHandler<DB>(queryEngine);

        const req = initReq(q, true);

        const res = initRes();

        const responseWriteSpy = vi.spyOn(res, 'write');
        const responseSetHeaderSpy = vi.spyOn(res, 'setHeader');

        await handler(req, res);

        expect(responseWriteSpy).toHaveBeenLastCalledWith(
            JSON.stringify({
                actor_id: 1,
                first_name: 'PENELOPE',
                last_name: 'GUINESS',
            }),
        );

        expect(responseSetHeaderSpy).toHaveBeenLastCalledWith(
            'Content-Type',
            'application/json',
        );

        expect(res.statusCode).toBe(200);

        const newReq = initReq(q, true);

        const newRes = initRes();

        expect(async () => await handler(newReq, newRes)).not.toThrow();
    });

    test(`Well-formed and valid query execution is successful with 'returnLastOnly: false' header passed`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 2 })
            .one();

        const handler = createExpressSynthqlHandler<DB>(queryEngine);

        const req = initReq(q, false);

        const res = initRes();

        const responseWriteSpy = vi.spyOn(res, 'write');
        const responseSetHeaderSpy = vi.spyOn(res, 'setHeader');

        await handler(req, res);

        expect(responseWriteSpy).toHaveBeenCalledWith(
            JSON.stringify({
                actor_id: 2,
                first_name: 'NICK',
                last_name: 'WAHLBERG',
            }),
        );

        expect(responseWriteSpy).toHaveBeenLastCalledWith('\n');

        expect(responseSetHeaderSpy).toHaveBeenLastCalledWith(
            'Content-Type',
            'application/x-ndjson',
        );

        expect(res.statusCode).toBe(200);

        const newReq = initReq(q, false);

        const newRes = initRes();

        expect(async () => await handler(newReq, newRes)).not.toThrow();
    });

    test(`Well-formed and valid query execution is successful with no headers passed `, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 3 })
            .one();

        const handler = createExpressSynthqlHandler<DB>(queryEngine);

        const req = initReq(q);

        const res = initRes();

        const responseWriteSpy = vi.spyOn(res, 'write');
        const responseSetHeaderSpy = vi.spyOn(res, 'setHeader');

        await handler(req, res);

        expect(responseWriteSpy).toHaveBeenCalledWith(
            JSON.stringify({
                actor_id: 3,
                first_name: 'ED',
                last_name: 'CHASE',
            }),
        );

        expect(responseWriteSpy).toHaveBeenLastCalledWith('\n');

        expect(responseSetHeaderSpy).toHaveBeenLastCalledWith(
            'Content-Type',
            'application/x-ndjson',
        );

        expect(res.statusCode).toBe(200);

        const newReq = initReq(q);

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

        const error = SynthqlError.createJsonParsingError({
            error: {},
            json: q,
        });

        const responseWriteSpy = vi.spyOn(res, 'write');
        const responseSetHeaderSpy = vi.spyOn(res, 'setHeader');

        await handler(req, res);

        expect(responseWriteSpy).toHaveBeenLastCalledWith(
            JSON.stringify({
                type: error.type,
                error: error.message,
            }),
        );

        expect(responseSetHeaderSpy).toHaveBeenLastCalledWith(
            'Content-Type',
            'application/json',
        );

        expect(res.statusCode).toBe(400);

        const newReq = {
            body: q,
            headers: {},
        };

        const newRes = initRes();

        expect(async () => await handler(newReq, newRes)).not.toThrow();
    });

    test(`Well-formed but invalid query object returns expected SQL execution error`, async () => {
        const q = fromWithVirtualTables('film_rating')
            .columns('film_id', 'rating')
            .where({ film_id: 1 })
            .one();

        const handler =
            createExpressSynthqlHandler<DbWithVirtualTables>(queryEngine);

        const req = initReq(q, true);

        const res = initRes();

        const { sqlBuilder } = composeQuery({
            defaultSchema: 'public',
            query: q,
        });

        const { params, sql } = sqlBuilder.build();

        const error = SynthqlError.createSqlExecutionError({
            error: {},
            props: { params, sql, query: q },
        });

        const responseWriteSpy = vi.spyOn(res, 'write');
        const responseSetHeaderSpy = vi.spyOn(res, 'setHeader');

        await handler(req, res);

        expect(responseWriteSpy).toHaveBeenLastCalledWith(
            expect.stringContaining(error.type),
        );

        expect(responseSetHeaderSpy).toHaveBeenLastCalledWith(
            'Content-Type',
            'application/json',
        );

        expect(res.statusCode).toBe(400);

        const newReq = initReq(q, true);

        const newRes = initRes();

        expect(async () => await handler(newReq, newRes)).not.toThrow();
    });

    test(`Well-formed but invalid query object returns expected response streaming error`, async () => {
        const q = fromWithVirtualTables('film_rating')
            .columns('film_id', 'rating')
            .where({ film_id: 1 })
            .one();

        const handler =
            createExpressSynthqlHandler<DbWithVirtualTables>(queryEngine);

        const req = initReq(q, false);

        const res = initRes();

        const error = SynthqlError.createResponseStreamingError({
            error: {},
            query: q,
        });

        const responseWriteSpy = vi.spyOn(res, 'write');
        const responseSetHeaderSpy = vi.spyOn(res, 'setHeader');

        await handler(req, res);

        expect(responseWriteSpy).toHaveBeenLastCalledWith(
            JSON.stringify({
                type: error.type,
                error: error.message,
            }),
        );

        expect(responseSetHeaderSpy).toHaveBeenLastCalledWith(
            'Content-Type',
            'application/x-ndjson',
        );

        expect(res.statusCode).toBe(200);

        const newReq = initReq(q, false);

        const newRes = initRes();

        expect(async () => await handler(newReq, newRes)).not.toThrow();
    });
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
    };
}
