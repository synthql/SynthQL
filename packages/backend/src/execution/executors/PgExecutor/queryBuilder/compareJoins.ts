import { Join } from './types';

/**
 * A comparator that compares two joins to determine which ones should go earlier
 * when compiling to SQL.
 *
 * For example, this order is incorrect:
 *
 * ```sql
 * from store
 * left join pets on pet.id = person.id
 * left join person on person.id = store.owner_id
 * ```
 *
 * while this order is correct:
 *
 * ```sql
 * from store
 * left join person on person.id = store.owner_id
 * left join pets on pet.id = person.id
 * ```
 */
export function compareJoins(left: Join, right: Join): number {
    if (references(left, right)) {
        return 1;
    }
    if (references(right, left)) {
        return -1;
    }
    return 0;
}

/**
 * @returns true if a references b
 */
function references(a: Join, b: Join): boolean {
    return a.conditions.some((cond) => {
        return cond.otherColumn.tableRef.table === b.table.table;
    });
}
