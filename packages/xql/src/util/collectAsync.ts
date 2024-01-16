

export async function collectAsync<T>(gen: AsyncGenerator<T>): Promise<T[]> {
    const result = [];
    for await (const item of gen) {
        result.push(item);
    }
    return result;
}