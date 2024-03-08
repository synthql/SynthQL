/**
 * Small helper function to remove indentation from a string.
 * 
 * This is useful for replacing `.toMatchInlineSnapshot()` with `toEqual(removeIndentation(...))`.
 */
export function removeIndentation(s: string) {
    const lines = s.split('\n').filter(s => s.trim().length > 0);
    const indentation = lines[0].match(/^\s+/)?.[0].length
    return lines.map((x, i) => {
        if (i === 0) {
            return x.slice(indentation).replace(/^"/, '')
        }
        if (i === lines.length - 1) {
            return x.slice(indentation).replace(/"$/, '')
        }
        return x.slice(indentation)
    }).join('\n')
}