const validTableNamePattern = /^[a-zA-Z_][a-zA-Z0-9_:]*$/;
/**
 * Takes raw table name and escapes it, to prevent SQL injection.
 */
export function escapeRef(ref: string, withQuotes: boolean): string {
    return ref.split('.').map(part => {
        if (!validTableNamePattern.test(part)) {
            throw new Error(`Invalid ref: ${part} from ${ref}`);
        }
        if (withQuotes) {
            return `"${part}"`;
        }
        return part;
    }).join('.');
}


