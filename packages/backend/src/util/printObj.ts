const maxStrLength = 20;
const maxArrayLength = 3;

export function printObj(item: unknown): string {
    return JSON.stringify(
        item,
        (key, value) => {
            if (typeof value === 'string') {
                return value.length <= maxStrLength
                    ? value
                    : value.slice(0, maxStrLength) +
                          '... (total ' +
                          value.length +
                          ' chars)';
            }
            if (Array.isArray(value)) {
                const skipped = value.length - maxArrayLength;
                return value
                    .slice(0, maxArrayLength)
                    .concat(
                        value.length > maxArrayLength
                            ? [`...${skipped} skipped`]
                            : [],
                    );
            }
            return value;
        },
        2,
    );
}
