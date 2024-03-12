import { mapTreeSync } from "./mapTreeSync";

export function selectKeys<
    TTree extends { children: TTree[] },
    TKeys extends Exclude<keyof TTree, 'children'>,
>(tree: TTree, ...keys: Array<TKeys>) {

    return mapTreeSync(tree, (node) => {
        const result = {} as { [key in TKeys]: any };
        for (const key of keys) {
            result[key] = node[key];
        }
        return result;
    })
}
