import http from 'http';

export interface EchoServer {
    url: string;
    server: http.Server;
}

export function createEchoServer(
    mapRequest: (reqBody: any) => any[],
): Promise<EchoServer> {
    return new Promise((resolve, reject) => {
        const server = http.createServer((req, res) => {
            /* Reads the body, which always has the following form:
                { lines: any[] }
            and echos it back */

            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                const json = JSON.parse(body);

                const lines = mapRequest(json);

                res.writeHead(200, { 'Content-Type': 'application/json' });

                for (const line of lines) {
                    res.write(JSON.stringify(line) + '\n');
                }

                // flush the buffer
                res.end();
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
