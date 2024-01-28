export function escapeColumn(col: string) {
    return `"${col.replace(/"/g, '""')}"`;
}
