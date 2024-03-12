const maxStrLength = 20;
const maxArrayLength = 3;

export function printObj(item: unknown): string {
    if (Array.isArray(item)) {
        return (
            item.slice(0, 5).map(printObj).join(', ') +
            (item.length > 5 ? ', ... (total ' + item.length + ' items)' : '')
        );
    }
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
