import { QueryEngine } from '@synthql/backend';
import { DB as PagilaDB } from './pagilaDb';
import http from 'http';

export interface PagilaServer {
    url: string;
    server: http.Server;
}

export function createPagilaServer({
    queryEngine,
}: {
    queryEngine: QueryEngine<PagilaDB>;
}): Promise<PagilaServer> {
    return new Promise((resolve, reject) => {
        const server = http.createServer((req, res) => {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', async () => {
                const headers = req.headers;

                const json = JSON.parse(body);

                res.writeHead(200, { 'Content-Type': 'application/json' });

                try {
                    for await (const intermediateResult of queryEngine.execute(
                        json,
                        {
                            returnLastOnly:
                                headers['x-return-last-only'] === 'true',
                        },
                    )) {
                        res.write(JSON.stringify(intermediateResult) + '\n');
                    }

                    res.end();
                } catch (error) {
                    res.write(JSON.stringify({ error: String(error) }) + '\n');

                    res.end();
                }
            });
        });

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
