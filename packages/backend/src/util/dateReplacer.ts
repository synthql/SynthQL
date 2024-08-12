export function dateReplacer(this: any, key: any, value: any) {
    if (this[key] instanceof Date) {
        return {
            __type: 'Date',
            isoString: this[key].toISOString(),
        };
    }

    return value;
}
