import { QueryEngine, collectLast } from '../..';
import type { Request, Response } from 'express';
import { SynthqlError } from '../../SynthqlError';

export type ExpressSynthqlHandlerRequest = Pick<Request, 'body' | 'headers'>;
export type ExpressSynthqlHandlerResponse = Pick<
    Response,
    'statusCode' | 'status' | 'write' | 'setHeader' | 'end'
>;

export type ExpressSynthqlHandler = (
    req: ExpressSynthqlHandlerRequest,
    res: ExpressSynthqlHandlerResponse,
) => void;

export function createExpressSynthqlHandler<T>(
    queryEngine: QueryEngine<T>,
): ExpressSynthqlHandler {
    return async (req, res) => {
        // First, there should be a global error handler that catches all errors
        // 1. Known errors (i.e. `SynthqlError`s) should be converted to a JSON response
        // 2. Unknown errors should be passed on to the next layer

        try {
            await executeSynthqlRequest<T>(queryEngine, req, res);
        } catch (e) {
            // Handle known `SynthqlError`s
            if (e instanceof SynthqlError) {
                res.status(400).json({
                    type: e.type,
                    error: e.message,
                });
            } else {
                // Let another layer handle the error
                throw e;
            }
        }
    };
}

async function executeSynthqlRequest<T>(
    queryEngine: QueryEngine<T>,
    req: ExpressSynthqlHandlerRequest,
    res: ExpressSynthqlHandlerResponse,
) {
    // First try to parse the request body as JSON
    const { query, returnLastOnly } = await tryParseRequest(req);

    // We don't do this yet, but eventually we'll want to validate the request
    // const validatedQuery = await tryValidateSynthqlQuery(query);

    // Execute the query, but just to get the initial generator
    const resultGenerator = await tryExecuteQuery<T>(
        queryEngine,
        query,
        returnLastOnly,
    );

    // Now that we have the generator, we want to iterate over the items
    // and depending on `returnLastOnly`, we will write the status code
    // either before, or after iteration
    await writeBody(res, query, resultGenerator, returnLastOnly);

    res.end();
}

async function tryParseRequest(req: ExpressSynthqlHandlerRequest) {
    const body = req.body;
    const returnLastOnly = req.headers['x-return-last-only'] === 'true';

    try {
        const query = JSON.parse(body);

        return { query, returnLastOnly };
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

async function writeBody(
    res: ExpressSynthqlHandlerResponse,
    query: any,
    generator: AsyncGenerator<any>,
    returnLastOnly: boolean,
) {
    if (returnLastOnly) {
        // If this fails, fail early and use the global error handler
        const lastResult = await collectLast(generator);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        res.write(JSON.stringify(lastResult));
    } else {
        try {
            // This is a streaming request, so albeit
            // counterintuitively, we always need to return 2xx

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/x-ndjson');

            for await (const intermediateResult of generator) {
                res.write(JSON.stringify(intermediateResult));
                res.write('\n');
            }
        } catch (e) {
            // First, wrap the error in a SynthqlError to capture
            // the fact that it happened during streaming

            // The `e` can be of any type, but in case its an error,
            // we want to preserve the stack trace and any other
            // information that might be useful for debugging

            const error = SynthqlError.createResponseStreamingError({
                error: e,
                query,
            });

            // We need to catch errors here and write them to the streaming response
            // We can't throw them because that would break the stream

            res.write(
                JSON.stringify({
                    type: error.type,
                    error: error.message,
                }),
            );
        }
    }
}
