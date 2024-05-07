import http from 'http';
import type { IncomingMessage, ServerResponse } from 'http';

export interface HttpServer {
    url: string;
    server: http.Server;
}

export function createHttpServer(
    handler: (req: IncomingMessage, res: ServerResponse) => void,
): Promise<HttpServer> {
    return new Promise((resolve, reject) => {
        const server = http.createServer(handler);

        server.listen(() => {
            const address = server.address();
            if (typeof address === 'string' || address === null) {
                reject('Failed to get server address: ' + address);
            } else {
                resolve({
                    url: `http://localhost:${address.port}`,
                    server,
                });
            }
        });
    });
}
