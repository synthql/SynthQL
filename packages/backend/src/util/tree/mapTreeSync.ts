export function mapTreeSync<
    T extends { children: T[] },
    K extends { children: K[] },
>(tree: T, mapper: (node: T) => Omit<K, 'children'>): K {
    const mappedNode = mapper(tree);

    const children: K[] = tree.children.map((child) =>
        mapTreeSync(child, mapper),
    );
    const result = {
        ...mappedNode,
        children,
    } as K;
    return result;
}
