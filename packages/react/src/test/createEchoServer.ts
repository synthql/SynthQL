import http from "http"

export function createEchoServer(): Promise<{ url: string }> {
    return new Promise<{ url: string }>((resolve, reject) => {

        const server = http.createServer((req, res) => {
            // reads the body, which always has the following form
            // { lines: any[] }
            // and echos it back
            let body = ""
            req.on("data", chunk => {
                body += chunk
            })
            req.on("end", () => {
                const json = JSON.parse(body)
                res.writeHead(200, { "Content-Type": "application/json" })

                for (const line of json.lines) {
                    res.write(JSON.stringify(line) + "\n")
                }
                // flush the buffer
                res.end()
            })
        }).listen(() => {
            const address = server.address()
            if (typeof address === "string" || address === null) {
                reject("Failed to get server address: " + address)
            }
            else {
                resolve({
                    url: `http://localhost:${address.port}`,
                })
            }
        });

    })
}