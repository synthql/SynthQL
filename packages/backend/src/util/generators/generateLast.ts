import { collectLast } from "./collectLast";

/**
 * Takes a generator as input and returns a generator that only yields the last value.
 */
export async function* generateLast<T>(gen: AsyncGenerator<T>): AsyncGenerator<T> {
    const lastValue = collectLast(gen);
    yield lastValue;
}
