export async function collectFirst<T>(gen: AsyncGenerator<T>): Promise<T> {
    for await (const item of gen) {
        return item;
    } /* v8 ignore next 2 */
    throw new Error('unreachable');
}
