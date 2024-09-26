import type { Request, Response, RequestHandler } from 'express';
import { collectLast, QueryEngine, SynthqlError } from '@synthql/backend';
import {
    isRegisteredQueryRequest,
    isRegularQueryRequest,
    Query,
} from '@synthql/queries';

/**
 * Create an Express request handler that can handle SynthQL requests.
 *
 * Usage:
 *
 * ```typescript
 * import express from 'express';
 * import { createExpressSynthqlHandler } from '@synthql/handler-express';
 * import { queryEngine } from './queryEngine';
 *
 * const app = express();
 * app.use(createExpressSynthqlHandler(queryEngine));
 * ```
 *
 */
export function createExpressSynthqlHandler<DB>(
    queryEngine: QueryEngine<DB>,
): RequestHandler {
    return async (req, res, next) => {
        // First, there should be a global error handler that catches all errors
        // 1. Known errors (i.e. `SynthqlError`s) should be converted to a JSON response
        // 2. Unknown errors should be passed on to the next layer

        try {
            await executeSynthqlRequest<DB>(queryEngine, req, res);
        } catch (e) {
            // Handle known `SynthqlError`s
            if (e instanceof SynthqlError) {
                res.statusCode = e.code;
                res.setHeader('Content-Type', 'application/json');

                res.write(
                    JSON.stringify({
                        type: e.type,
                        error: e.message,
                    }),
                );

                res.end();
            } else {
                // Let another layer handle the error
                next(e);
            }
        }
    };
}

async function executeSynthqlRequest<DB>(
    queryEngine: QueryEngine<DB>,
    req: Request,
    res: Response,
) {
    // First try to parse the request body as JSON
    const { body, headers } = await tryParseRequest(req);

    // We don't do this yet, but eventually we'll want to validate the request
    // const validatedQuery = await tryValidateSynthqlQuery(query);

    // Execute the query, but just to get the initial generator
    const resultGenerator = await tryExecuteQuery<DB>(
        queryEngine,
        body,
        headers.returnLastOnly,
    );

    // Now that we have the generator, we want to iterate over the items
    // and depending on `returnLastOnly`, we will write the status code
    // either before, or after iteration
    await writeResponseBody(res, body, resultGenerator, headers.returnLastOnly);

    // End response stream
    res.end();
}

async function tryParseRequest(req: Request) {
    try {
        return {
            body:
                typeof req.body === 'string' ? JSON.parse(req.body) : req.body,
            headers: {
                ...req.headers,
                returnLastOnly: req.headers['x-return-last-only'] === 'true',
            },
        };
    } catch (e) {
        throw SynthqlError.createJsonParsingError({
            error: e,
            json: req.body,
        });
    }
}

async function tryExecuteQuery<DB>(
    queryEngine: QueryEngine<DB>,
    queryOrBody: any,
    returnLastOnly: boolean,
) {
    if (isRegisteredQueryRequest(queryOrBody)) {
        return queryEngine.executeRegisteredQuery(
            {
                queryId: queryOrBody.queryId,
                params: queryOrBody.params,
            },
            {
                returnLastOnly,
            },
        );
    } else if (isRegularQueryRequest(queryOrBody)) {
        return queryEngine.execute(queryOrBody.query as Query<DB>, {
            returnLastOnly,
        });
    } else {
        return queryEngine.execute(queryOrBody, { returnLastOnly });
    }
}

async function writeResponseBody(
    res: Response,
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

            // The `e` can be of any type, but in case its an error
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
