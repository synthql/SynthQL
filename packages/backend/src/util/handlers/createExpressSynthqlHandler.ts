import { QueryEngine, collectLast } from '../..';
import type { Request, Response } from 'express';

export type ExpressSynthqlHandler = (req: Request, res: Response) => void;

export async function createExpressSynthqlHandler<T>(
    queryEngine: QueryEngine<T>,
): Promise<ExpressSynthqlHandler> {
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

                    res.status(200);

                    res.setHeader('Content-Type', 'application/x-ndjson');

                    res.write(JSON.stringify(result));

                    res.write('\n');

                    res.end();
                } catch (error) {
                    res.status(400);

                    res.setHeader('Content-Type', 'application/x-ndjson');

                    res.write(JSON.stringify({ error: String(error) }));

                    res.write('\n');

                    res.end();
                }
            } else {
                res.status(200);

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
            res.write(JSON.stringify({ error: String(error) }));

            res.write('\n');

            res.end();
        }
    };
}
