import { TableRef } from './TableRef';
import { ColumnRef } from "./ColumnRef";

/**
 * A `RefContext` maintains a record from reference IDs to their actual values. E.g. { 'person.id': [1,2] }
 *
 * Example:
 *
 * ```ts
 * from('films')
 *  .where({main_actor_id: col('actor.id')})
 *  .many()
 * ```
 *
 * When this query is executed, the RefContext will be used to replace `col('actor.id')` with the values
 * contained in the `RefContext`.
 */
export interface RefContext {
    getValues(ref: ColumnRef): any[];
    addValues(ref: ColumnRef, ...values: any[]): any[];
    getColumns(): ColumnRef[];

    merge(other: RefContext): void;
    getEntries(): [ColumnRef, any[]][];
}

export function createRefContext(): RefContext {
    const refs = new Map<string, Set<any>>();
    const hash = (ref: ColumnRef) =>
        `${ref.tableRef.schema}.${ref.tableRef.table}.${ref.column}`;

    const getOrDefault = (ref: ColumnRef): Set<any> => {
        const hasedRef = hash(ref);
        if (!refs.has(hasedRef)) {
            refs.set(hasedRef, new Set());
        }
        return refs.get(hasedRef)!;
    };

    return {
        getValues(ref) {
            return Array.from(getOrDefault(ref));
        },
        addValues(ref, ...values) {
            const set = getOrDefault(ref);
            for (const value of values) {
                set.add(value);
            }
            return Array.from(set);
        },
        getColumns() {
            const keys = Array.from(refs.keys());
            return keys.map((key) => {
                const [schema, table, column] = key.split('.');
                return new TableRef(schema, table).column(column);
            });
        },
        getEntries() {
            return Array.from(refs.entries()).map(([key, values]) => {
                const [schema, table, column] = key.split('.');
                return [
                    new TableRef(schema, table).column(column),
                    Array.from(values),
                ];
            });
        },
        merge(other: RefContext) {
            for (const [ref, values] of other.getEntries()) {
                this.addValues(ref, ...values);
            }
            return this;
        },
    };
}
