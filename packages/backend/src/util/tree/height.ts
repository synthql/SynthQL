/**
 * Returns the height of the tree.
 */
export function height<T extends { children: T[] }>(tree: T): number {
    if (tree.children.length === 0) {
        return 1
    }
    return 1 + Math.max(...tree.children.map(height))
}