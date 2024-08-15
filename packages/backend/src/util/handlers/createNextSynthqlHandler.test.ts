import { describe, expect, test, vi } from 'vitest';
import { DB, from, schema } from '../../tests/generated';
import { queryEngine } from '../../tests/queryEngine';
import { PgCatalogInt4, PgCatalogText } from '../../tests/generated/db';
import { query } from '@synthql/queries';
import { SynthqlError } from '../../SynthqlError';
import { composeQuery } from '../../execution/executors/PgExecutor/composeQuery';
import {
    createNextSynthqlHandler,
    NextSynthqlHandlerRequest,
} from './createNextSynthqlHandler';
import { NextRequest } from 'next/server';
import { fetchJsonLines } from '../tree/fetchJsonLines';

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
    $schema: '',
    type: '',
    description: '',
    required: [],
    additionalProperties: false,
    $defs: {},
    properties: {
        ...schema.properties,
        film_rating: {
            type: '',
            description: '',
            required: [],
            additionalProperties: false,
            properties: {
                columns: {
                    type: '',
                    description: '',
                    required: [],
                    additionalProperties: false,
                    properties: {
                        film_id: {
                            type: '',
                            description: '',
                            required: [],
                            additionalProperties: false,
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
                            },
                        },
                        rating: {
                            type: '',
                            description: '',
                            required: [],
                            additionalProperties: false,
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
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

describe('createNextSynthqlHandler', () => {
    test(`Well-formed and valid query execution is successful with 'returnLastOnly: true' header passed`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 1 })
            .one();

        const handler = createNextSynthqlHandler<DB>(queryEngine);

        const req = initReq(q, true);

        const res = await handler(req);

        expect(await res.text()).toEqual(
            JSON.stringify({
                actor_id: 1,
                first_name: 'PENELOPE',
                last_name: 'GUINESS',
            }),
        );

        const responseHeaders = Object.fromEntries(res.headers);

        expect(responseHeaders['content-type']).toEqual('application/json');

        expect(res.status).toBe(200);

        const newReq = initReq(q, true);

        expect(async () => await handler(newReq)).not.toThrow();
    });

    test(`Well-formed and valid query execution is successful with 'returnLastOnly: false' header passed`, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 2 })
            .one();

        const handler = createNextSynthqlHandler<DB>(queryEngine);

        const req = initReq(q, false);

        const res = await handler(req);

        console.log(0, res);

        console.log(1, res.body);

        for await (const line of fetchJsonLines(res.body)) {
            expect(line).toEqual({
                actor_id: 2,
                first_name: 'NICK',
                last_name: 'WAHLBERG',
            });
        }

        const responseHeaders = Object.fromEntries(res.headers);

        expect(responseHeaders['content-type']).toEqual('application/x-ndjson');

        expect(res.status).toBe(200);

        const newReq = initReq(q, false);

        expect(async () => await handler(newReq)).not.toThrow();
    });

    test(`Well-formed and valid query execution is successful with no headers passed `, async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 3 })
            .one();

        const handler = createNextSynthqlHandler<DB>(queryEngine);

        const req = initReq(q);

        const res = await handler(req);

        expect(await res.text()).toEqual(
            JSON.stringify({
                actor_id: 3,
                first_name: 'ED',
                last_name: 'CHASE',
            }) + '\n',
        );

        const responseHeaders = Object.fromEntries(res.headers);

        expect(responseHeaders['content-type']).toEqual('application/x-ndjson');

        expect(res.status).toBe(200);

        const newReq = initReq(q);

        expect(async () => await handler(newReq)).not.toThrow();
    });

    test(`Malformed query returns expected JSON parsing error`, async () => {
        const q = "{ name: 'John', age: 30 }";

        const handler = createNextSynthqlHandler<DB>(queryEngine);

        const req = new NextRequest('http://localhost:3000/synthql', {
            method: 'POST',
            body: q,
            headers: {},
        });

        const error = SynthqlError.createJsonParsingError({
            error: {},
            json: q,
        });

        const res = await handler(req);

        expect(await res.text()).toEqual(
            JSON.stringify({
                type: error.type,
                error: error.message,
            }),
        );

        const responseHeaders = Object.fromEntries(res.headers);

        expect(responseHeaders['content-type']).toEqual('application/json');

        expect(res.status).toBe(400);

        const newReq = new NextRequest('http://localhost:3000/synthql', {
            method: 'POST',
            body: q,
            headers: {},
        });

        expect(async () => await handler(newReq)).not.toThrow();
    });

    test(`Well-formed but invalid query object returns expected SQL execution error`, async () => {
        const q = fromWithVirtualTables('film_rating')
            .columns('film_id', 'rating')
            .where({ film_id: 1 })
            .one();

        const handler =
            createNextSynthqlHandler<DbWithVirtualTables>(queryEngine);

        const req = initReq(q, true);

        const { sqlBuilder } = composeQuery({
            defaultSchema: 'public',
            query: q,
        });

        const { params, sql } = sqlBuilder.build();

        const error = SynthqlError.createSqlExecutionError({
            error: {},
            props: { params, sql, query: q },
        });

        const res = await handler(req);

        expect(await res.text()).toEqual(expect.stringContaining(error.type));

        const responseHeaders = Object.fromEntries(res.headers);

        expect(responseHeaders['content-type']).toEqual('application/json');

        expect(res.status).toBe(400);

        const newReq = initReq(q, true);

        expect(async () => await handler(newReq)).not.toThrow();
    });

    test(`Well-formed but invalid query object returns expected response streaming error`, async () => {
        const q = fromWithVirtualTables('film_rating')
            .columns('film_id', 'rating')
            .where({ film_id: 1 })
            .one();

        const handler =
            createNextSynthqlHandler<DbWithVirtualTables>(queryEngine);

        const req = initReq(q, false);

        const error = SynthqlError.createResponseStreamingError({
            error: {},
            query: q,
        });

        const res = await handler(req);

        expect(await res.text()).toEqual(
            JSON.stringify({
                type: error.type,
                error: error.message,
            }),
        );

        const responseHeaders = Object.fromEntries(res.headers);

        expect(responseHeaders['content-type']).toEqual('application/x-ndjson');

        expect(res.status).toBe(200);

        const newReq = initReq(q, false);

        expect(async () => await handler(newReq)).not.toThrow();
    });
});

function initReq(
    query: any,
    returnLastOnly?: boolean,
): NextSynthqlHandlerRequest {
    return new NextRequest('http://localhost:3000/synthql', {
        method: 'POST',
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
    });
}
