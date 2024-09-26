import { NextRequest, NextResponse } from 'next/server';
import { collectLast, QueryEngine, SynthqlError } from '@synthql/backend';
import {
    isRegisteredQueryRequest,
    isRegularQueryRequest,
    Query,
} from '@synthql/queries';
import { ReadableStream } from 'stream/web';

export type NextSynthqlHandlerRequest = Pick<
    NextRequest,
    'body' | 'headers' | 'text'
>;
export type NextSynthqlHandler = (
    req: NextSynthqlHandlerRequest,
) => Promise<NextResponse>;

/**
 * Create a Next request handler that can handle SynthQL requests.
 *
 * Usage:
 *
 * ```typescript
 * import { createNextSynthqlHandler } from '@synthql/handler-next';
 * import { queryEngine } from './queryEngine';
 *
 * const nextSynthqlRequestHandler = createNextSynthqlHandler(queryEngine);
 *
 * export async function POST(request: Request) {
 *     return await nextSynthqlRequestHandler(request);
 * }
 * ```
 *
 */
export function createNextSynthqlHandler<DB>(
    queryEngine: QueryEngine<DB>,
): NextSynthqlHandler {
    return async (req) => {
        // First, there should be a global error handler that catches all errors
        // 1. Known errors (i.e. `SynthqlError`s) should be converted to a JSON response
        // 2. Unknown errors should be passed on to the next layer

        try {
            return await executeSynthqlRequest<DB>(queryEngine, req);
        } catch (error) {
            // Handle known `SynthqlError`s
            if (error instanceof SynthqlError) {
                return new NextResponse(
                    JSON.stringify({
                        type: error.type,
                        error: error.message,
                    }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    },
                );
            } else {
                // Let another layer handle the error
                throw error;
            }
        }
    };
}

async function executeSynthqlRequest<DB>(
    queryEngine: QueryEngine<DB>,
    req: NextSynthqlHandlerRequest,
): Promise<NextResponse> {
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

    // Now that we have the generator, we want to iterate over
    // the items and depending on `returnLastOnly`, we will
    // write the status code either before, or after iteration
    return await writeResponseBody(
        body,
        resultGenerator,
        headers.returnLastOnly,
    );
}

async function tryParseRequest(req: NextSynthqlHandlerRequest) {
    const body = await req.text();
    const requestHeaders = Object.fromEntries(req.headers);

    try {
        return {
            body: JSON.parse(body),
            headers: {
                ...requestHeaders,
                returnLastOnly: requestHeaders['x-return-last-only'] === 'true',
            },
        };
    } catch (e) {
        throw SynthqlError.createJsonParsingError({
            error: e,
            json: body,
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
    query: any,
    generator: AsyncGenerator<any>,
    returnLastOnly: boolean,
) {
    if (returnLastOnly) {
        // If this fails, fail early and use the global error handler
        const lastResult = await collectLast(generator);

        return new NextResponse(JSON.stringify(lastResult), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        try {
            const stream = generatorToStream(generator);

            return new NextResponse(stream, {
                // This is a streaming request, so albeit
                // counterintuitively, we always need to return 2xx

                status: 200,
                headers: { 'Content-Type': 'application/x-ndjson' },
            });
        } catch (e) {
            // TODO: FIX: This logic is never trigerred, because
            // the error is thrown directly inside the NextResponse
            // stream, so its simply thrown as an exception when the
            // stream is read by the client. We'll need to rewrite
            // the streaming logic, if we still want to return
            // ResponseStreamingError errors, but with the way
            // NextResponse works, I don't think we need to,
            // and we can keep the ResponseStreamingError
            // to be used in Express-like handlers

            // First, wrap the error in a SynthqlError to capture
            // the fact that it happened during streaming

            // The `e` can be of any type, but in case its an error,
            // we want to preserve the stack trace and any other
            // information that might be useful for debugging

            // We need to catch errors here and write them to the streaming response
            // We can't throw them because that would break the stream

            const error = SynthqlError.createResponseStreamingError({
                error: e,
                query,
            });

            return new NextResponse(
                JSON.stringify({
                    type: error.type,
                    error: error.message,
                }),
            );
        }
    }
}

function generatorToStream(generator: AsyncGenerator<any>) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await generator.next();

            if (done) {
                controller.close();
            } else {
                controller.enqueue(
                    new TextEncoder().encode(JSON.stringify(value)),
                );

                controller.enqueue(new TextEncoder().encode('\n'));
            }
        },
    });
}
