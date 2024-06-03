import { QueryEngine, SynthqlError, collectLast } from '../..';
import type { Request, Response } from 'express';
import { SqlExecutionError } from '../../execution/executors/SqlExecutionError';

export type ExpressSynthqlHandlerRequest = Pick<Request, 'body' | 'headers'>;
export type ExpressSynthqlHandlerResponse = Pick<
    Response,
    'statusCode' | 'write' | 'setHeader' | 'end'
>;

export type ExpressSynthqlHandler = (
    req: ExpressSynthqlHandlerRequest,
    res: ExpressSynthqlHandlerResponse,
) => void;

export function createExpressSynthqlHandler<T>(
    queryEngine: QueryEngine<T>,
): ExpressSynthqlHandler {
    return async (req, res) => {
        const returnLastOnly = req.headers['x-return-last-only'] === 'true';

        try {
            const query = await tryParseBody(req.body);

            const queryResult = await tryExecuteQuery(
                queryEngine,
                query,
                returnLastOnly,
            );

            writeQueryResultToResponse(res, queryResult, returnLastOnly);
        } catch (e) {
            if (e instanceof SynthqlError) {
                // If it's a known error, write it to the response
                writeErrorToResponse(res, e);
            } else {
                // If it's an unknown error, just throw it so some other layer can handle it
                throw e;
            }
        }
    };
}

async function tryParseBody(body: any) {
    try {
        return JSON.parse(body);
    } catch (e) {
        throw SynthqlError.createJsonParsingError({
            error: e,
            json: body,
        });
    }
}

async function tryExecuteQuery<T>(
    queryEngine: QueryEngine<T>,
    query: any,
    returnLastOnly: boolean,
) {
    try {
        if (returnLastOnly) {
            return collectLast(queryEngine.execute(query, { returnLastOnly }));
        } else {
            return queryEngine.execute(query);
        }
    } catch (e) {
        if (e instanceof SqlExecutionError) {
            throw SynthqlError.createSqlError({
                error: e,
                sql: e.message,
            });
        } else {
            throw e;
        }
    }
}

async function writeQueryResultToResponse(
    res: ExpressSynthqlHandlerResponse,
    result: any,
    returnLastOnly: boolean,
) {
    try {
        if (returnLastOnly) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(result));
            res.end();
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/x-ndjson');

            for await (const intermediateResult of result) {
                res.write(JSON.stringify(intermediateResult));
                res.write('\n');
            }

            res.end();
        }
    } catch (e) {
        throw e;
    }
}

async function writeErrorToResponse(
    res: ExpressSynthqlHandlerResponse,
    err: SynthqlError,
) {
    try {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.write(
            JSON.stringify({
                errorType: err.type.json
                    ? 'JSON query parse error'
                    : err.type.sql
                      ? 'SQL query execution error'
                      : '',
                fullErrorStack: String(err),
                json: err.type.json,
                sql: err.type.sql,
            }),
        );
        res.end();
    } catch (e) {
        throw e;
    }
}
