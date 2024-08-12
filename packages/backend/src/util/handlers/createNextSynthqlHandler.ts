import { ReadableStream } from 'stream/web';
import { QueryEngine, collectLast } from '../..';
import { SynthqlError } from '../../SynthqlError';
import { NextRequest, NextResponse } from 'next/server';
import { dateReplacer } from '../dateReplacer';

export type NextSynthqlHandlerRequest = Pick<
    NextRequest,
    'body' | 'headers' | 'text'
>;
export type NextSynthqlHandler = (
    req: NextSynthqlHandlerRequest,
) => Promise<NextResponse>;

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
                    JSON.stringify(
                        {
                            type: error.type,
                            error: error.message,
                        },
                        dateReplacer,
                    ),
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
    const { query, returnLastOnly } = await tryParseRequest(req);

    // We don't do this yet, but eventually we'll want to validate the request
    // const validatedQuery = await tryValidateSynthqlQuery(query);

    // Execute the query, but just to get the initial generator
    const resultGenerator = await tryExecuteQuery<DB>(
        queryEngine,
        query,
        returnLastOnly,
    );

    // Now that we have the generator, we want to iterate over
    // the items and depending on `returnLastOnly`, we will
    // write the status code either before, or after iteration
    return await writeBody(query, resultGenerator, returnLastOnly);
}

async function tryParseRequest(req: NextSynthqlHandlerRequest) {
    const body = await req.text();
    const requestHeaders = Object.fromEntries(req.headers);
    const returnLastOnly = requestHeaders['x-return-last-only'] === 'true';

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

async function tryExecuteQuery<DB>(
    queryEngine: QueryEngine<DB>,
    query: any,
    returnLastOnly: boolean,
) {
    return queryEngine.execute(query, { returnLastOnly });
}

async function writeBody(
    query: any,
    generator: AsyncGenerator<any>,
    returnLastOnly: boolean,
) {
    if (returnLastOnly) {
        // If this fails, fail early and use the global error handler
        const lastResult = await collectLast(generator);

        return new NextResponse(JSON.stringify(lastResult, dateReplacer), {
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

            return new NextResponse(
                JSON.stringify(
                    {
                        type: error.type,
                        error: error.message,
                    },
                    dateReplacer,
                ),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                },
            );
        }
    }
}

function generatorToStream(iterator: any) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next();

            if (done) {
                controller.close();
            } else {
                controller.enqueue(JSON.stringify(value, dateReplacer));
                controller.enqueue('\n');
            }
        },
    });
}
