/**
 * Performs a LEFT JOIN on two arrays using a hash table.
 */
function hashLeftJoin<TLeft, TRight>(
    left: TLeft[],
    right: TRight[],
    leftKey: (l: TLeft) => string,
    rightKey: (r: TRight) => string,
): Array<[TLeft, TRight | undefined]> {
    const rightHash = new Map<string, TRight>();
    for (const r of right) {
        rightHash.set(rightKey(r), r);
    }
    const result: Array<[TLeft, TRight | undefined]> = [];
    for (const l of left) {
        const r = rightHash.get(leftKey(l));
        result.push([l, r]);
    }
    return result;
}
