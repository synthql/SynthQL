import { QueryEngine } from '../..';
import { Request, Response } from 'express';

type ExpressSynthqlHandler = (req: Request, res: Response) => void;

export async function createExpressSynthqlHandler<T>(
    queryEngine: QueryEngine<T>,
): Promise<ExpressSynthqlHandler> {
    return async (req, res) => {
        const headers = req.headers;

        const query = JSON.parse(req.body);

        res.status(200);
        res.setHeader('Content-Type', 'application/x-ndjson');

        try {
            for await (const intermediateResult of queryEngine.execute(query, {
                returnLastOnly: headers['x-return-last-only'] === 'true',
            })) {
                res.write(JSON.stringify(intermediateResult) + '\n');
            }

            res.end('SynthQL request handled successfully!');
        } catch (error) {
            res.write(JSON.stringify({ error: String(error) }) + '\n');

            res.end('SynthQL request failed with error!');
        }
    };
}
