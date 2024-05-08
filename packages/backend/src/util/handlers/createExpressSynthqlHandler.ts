import { QueryEngine, collectLast } from '../..';
import type { Request, Response } from 'express';

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
        try {
            const headers = req.headers;

            const query = await JSON.parse(req.body);

            const returnLastOnly = headers['x-return-last-only'] === 'true';

            if (returnLastOnly) {
                try {
                    const result = await collectLast(
                        queryEngine.execute(query, {
                            returnLastOnly,
                        }),
                    );

                    res.statusCode = 200;

                    res.setHeader('Content-Type', 'application/json');

                    res.write(JSON.stringify(result));

                    res.end();
                } catch (error) {
                    res.statusCode = 500;

                    res.setHeader('Content-Type', 'application/json');

                    res.write(JSON.stringify({ error: String(error) }));

                    res.end();
                }
            } else {
                res.statusCode = 200;

                res.setHeader('Content-Type', 'application/x-ndjson');

                for await (const intermediateResult of queryEngine.execute(
                    query,
                )) {
                    res.write(JSON.stringify(intermediateResult));

                    res.write('\n');
                }

                res.end();
            }
        } catch (error) {
            res.statusCode = 400;

            res.setHeader('Content-Type', 'application/json');

            res.write(JSON.stringify({ error: 'Invalid JSON body' }));

            res.end();
        }
    };
}
