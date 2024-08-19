/**
 * Fetches a JSONL file and yields each line as a parsed JSON object.
 */
export async function* fetchJsonLines<T = any>(
    url: string,
    requestInit?: RequestInit,
): AsyncGenerator<T> {
    const response = await fetch(url, requestInit);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch: ${url} - Status: ${response.status} ${response.statusText}`,
        );
    }

    const reader = response.body?.getReader();

    if (!reader) {
        throw new Error('No reader available for the response body!');
    }

    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let done = false;

    while (!done) {
        const { value, done: chunkDone } = await reader.read();
        done = chunkDone;

        if (value) {
            buffer += decoder.decode(value, { stream: !done });

            let boundary = buffer.lastIndexOf('\n');

            // If no newline is found, boundary will be -1,
            // and we need the entire buffer for the next chunk
            if (boundary !== -1) {
                const lines = buffer.substring(0, boundary).split('\n');
                buffer = buffer.substring(boundary + 1);

                for (const line of lines) {
                    try {
                        yield JSON.parse(line);
                    } catch (error) {
                        console.error(
                            `Error parsing JSON line: ${line}`,
                            error,
                        );
                    }
                }
            }
        }
    }

    // Process any remaining line after the loop
    if (buffer.trim()) {
        try {
            yield JSON.parse(buffer);
        } catch (error) {
            console.error(`Error parsing JSON line: ${buffer}`, error);
        }
    }
}
