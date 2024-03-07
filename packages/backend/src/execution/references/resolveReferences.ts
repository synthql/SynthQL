import { AnyQuery } from "../../types";
import { mapRefs } from "../../query/mapRefs";
import { ColumnRef, TableRef } from "../executors/PgExecutor/queryBuilder/refs";

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
    getValues(ref: ColumnRef): any[]
    addValues(ref: ColumnRef, ...values: any[]): any[]
    getColumns(): ColumnRef[]


    merge(other: RefContext): void;
    getEntries(): [ColumnRef, any[]][]
}

export function createRefContext(): RefContext {
    const refs = new Map<string, Set<any>>()
    const hash = (ref: ColumnRef) => `${ref.tableRef.schema}.${ref.tableRef.table}.${ref.column}`

    const getOrDefault = (ref: ColumnRef): Set<any> => {
        const hasedRef = hash(ref);
        if (!refs.has(hasedRef)) {
            refs.set(hasedRef, new Set())
        }
        return refs.get(hasedRef)!
    }

    return {
        getValues(ref) {
            return Array.from(getOrDefault(ref))
        },
        addValues(ref, ...values) {
            const set = getOrDefault(ref);
            for (const value of values) {
                set.add(value)
            }
            return Array.from(set)
        },
        getColumns() {
            const keys = Array.from(refs.keys());
            return keys.map(key => {
                const [schema, table, column] = key.split('.');
                return new TableRef(schema, table).column(column)
            })
        },
        getEntries() {
            return Array.from(refs.entries()).map(([key, values]) => {
                const [schema, table, column] = key.split('.');
                return [new TableRef(schema, table).column(column), Array.from(values)]
            })
        },
        merge(other: RefContext) {
            for (const [ref, values] of other.getEntries()) {
                this.addValues(ref, ...values)
            }
            return this;
        }
    }
}

/**
 * Takes a query with references and resolves them to the actual values.
 * 
 * Example: find a person and their pets. 
 * 
 * ```ts
 * const pets = from('pet')
 *  .columns('id','title')
 *  .where({ owner_id: col('person.id')})
 *  .many()
 * 
 * const owner = from('person')
 *  .columns('id','name')
 *  .where({ id: userId })
 *  .include({ pets })
 *  .many()
 * ``` 
 *
 * The resolveReferences function would convert the pets query to:
 * 
 * ```ts
 * const pets = from('pet')
 *  .columns('id','title')
 *  .where({ owner_id: userId })
 *  .many()   
 * ```
 * 
 * @param query the query to resolve references for
 * @param refContext A record from reference IDs to their actual values. E.g. { 'person.id': [1,2] }
 */
export function resolveReferences(query: AnyQuery, refContext: RefContext, defaultSchema: string) {
    return {
        ...query,
        where: resolveReferencesInWhere(query.where, refContext, defaultSchema)
    }
}

function resolveReferencesInWhere(where: AnyQuery['where'], context: RefContext, defaultSchema: string) {
    return mapRefs(where, (ref) => {
        const referencedValues = context.getValues(ColumnRef.fromRefOp(ref, defaultSchema))
        return {
            in: referencedValues
        }
    })
}