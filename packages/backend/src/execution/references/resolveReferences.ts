import { RefOp } from "@synthql/queries";
import { AnyDb, AnyQuery } from "../../types";
import { mapQuery } from "../../util/mapQuery";
import { mapRefs } from "../../util/mapRefs";
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
    getValues(ref: RefOp<AnyDb>): any[]
    addValues(ref: RefOp<AnyDb>, ...values: any[]): any[]
    getColumns(): ColumnRef[]
}

export function createRefContext(defaultSchema: string): RefContext {
    const refs = new Map<string, any[]>()
    const hash = (ref: RefOp<AnyDb>) => `${ref.$ref.column}.${ref.$ref.table}`;

    return {
        getValues(ref) {
            const hasedRef = hash(ref);
            if (!refs.has(hasedRef)) {
                refs.set(hasedRef, [])
            }
            return refs.get(hasedRef)!
        },
        addValues(ref, ...values) {
            const result = this.getValues(ref);
            result.push(...values);
            return result;
        },
        getColumns() {
            const keys = Array.from(refs.keys());
            return keys.map(key => {
                return ColumnRef.parse(key, defaultSchema)
            })
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
export function resolveReferences(query: AnyQuery, refContext: RefContext) {
    return mapQuery(query, (query) => {
        return {
            ...query,
            where: resolveReferencesInWhere(query.where, refContext)
        }
    })
}

function resolveReferencesInWhere(where: AnyQuery['where'], context: RefContext) {
    return mapRefs(where, (ref) => {
        const referencedValues = context.getValues(ref)
        return {
            in: referencedValues
        }
    })
}