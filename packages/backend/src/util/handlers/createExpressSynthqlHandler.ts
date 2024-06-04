import { QueryEngine } from '../..';
import type { Request, Response } from 'express';
import { SynthqlError } from '../../SynthqlError';

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

            await writeQueryResultToResponse(res, queryResult);
        } catch (e) {
            if (e instanceof SynthqlError) {
                // If it's a SynthQL error, write it to the response
                await writeErrorToResponse(res, e);
            } else {
                // If it's an unknown error, just throw it so some other layer can handle it
                throw e;
            }
        }
    };
}

async function tryParseBody(body: string) {
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
    if (returnLastOnly) {
        return queryEngine.execute(query, { returnLastOnly });
    } else {
        return queryEngine.execute(query);
    }
}

async function writeQueryResultToResponse(
    res: ExpressSynthqlHandlerResponse,
    result: any,
) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/x-ndjson');

    for await (const intermediateResult of result) {
        res.write(JSON.stringify(intermediateResult));
        res.write('\n');
    }

    res.end();
}

async function writeErrorToResponse(
    res: ExpressSynthqlHandlerResponse,
    err: SynthqlError,
) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ type: err.type, message: err.message }));
    res.end();
}
