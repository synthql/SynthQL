

export async function collectFirst<T>(gen: AsyncGenerator<T>): Promise<T> {
    for await (const item of gen) {
        return item
    }
    throw new Error("unreachable")
}