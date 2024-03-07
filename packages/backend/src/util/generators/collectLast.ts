import { collectAsync } from "./collectAsync";

export async function collectLast<T>(gen: AsyncGenerator<T>): Promise<T> {
    const list = await collectAsync(gen);
    return list[list.length - 1];
}
