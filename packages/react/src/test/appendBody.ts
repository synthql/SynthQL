import { IncomingMessage, ServerResponse } from 'http';
import {} from '@synthql/handler-express';
import { Request, Response, RequestHandler, NextFunction } from 'express';

function readBody(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            resolve(body);
        });

        req.on('error', (e) => {
            reject(e);
        });
    });
}

export type IncomingMessageWithBody = IncomingMessage & Request;
export type ServerResponseWithEnd = ServerResponse & Response;

export function appendBody(expressHandler: RequestHandler) {
    return async (req: IncomingMessage, res: ServerResponse) => {
        const body = await readBody(req);

        const newReq = {
            ...req,
            headers: req.headers,
            body: body,
        } as IncomingMessageWithBody;

        const newRes = res as ServerResponseWithEnd;

        expressHandler(newReq, newRes, () => {});
    };
}
