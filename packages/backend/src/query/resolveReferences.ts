import { ColumnRef } from '../refs/ColumnRef';
import { RefContext } from '../refs/RefContext';
import { AnyQuery } from '../types';
import { mapRefs } from './mapRefs';

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
export function resolveReferences(
    query: AnyQuery,
    refContext: RefContext,
    defaultSchema: string,
): AnyQuery {
    return {
        ...query,
        where: resolveReferencesInWhere(query.where, refContext, defaultSchema),
    };
}

function resolveReferencesInWhere(
    where: AnyQuery['where'],
    context: RefContext,
    defaultSchema: string,
) {
    return mapRefs(where, (ref) => {
        const referencedValues = context.getValues(
            ColumnRef.fromRefOp(ref, defaultSchema),
        );

        return {
            in: referencedValues,
        };
    });
}
