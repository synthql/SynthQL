import { query, ref, WhereClause } from 'xql';
import { DB } from 'kysely-codegen';

function findManufacturerById(
    id: WhereClause<DB, 'public.manufacturer', 'id'>,
) {
    return query<DB>()
        .from('public.manufacturer')
        .where({
            id,
        })
        .select({
            id: true,
            name: true,
            alternative_names: true,
        })
        .one();
}

function findSourcingScenario(id: WhereClause<DB, 'sourcing_scenario', 'id'>) {
    return query<DB>()
        .from('sourcing_scenario')
        .where({
            id,
        })
        .select({
            id: true,
            name: true,
            solution_preference: true,
        })
        .one();
}

function findCustomPartById(id: WhereClause<DB, 'custom_part', 'id'>) {
    return query<DB>()
        .from('custom_part')
        .where({
            id,
        })
        .select({
            id: true,
            description: true,
            reach_compliant: true,
            part_type: true,
            rohs_compliant: true,
        })
        .maybe();
}

function findOtsPartById(
    id: WhereClause<DB, 'public.off_the_shelf_part', 'id'>,
) {
    return query<DB>()
        .from('public.off_the_shelf_part')
        .where({
            id,
        })
        .include({
            manufacturer: findManufacturerById(
                ref<DB>()
                    .table('public.off_the_shelf_part')
                    .column('manufacturer'),
            ),
        })
        .select({
            id: true,
            mpn: true,
        })
        .maybe();
}

function findPartOptionByDesignItemId(
    designItemId: WhereClause<DB, 'part_option', 'design_item_id'>,
) {
    return query<DB>()
        .from('part_option')
        .where({
            design_item_id: designItemId,
        })
        .include({
            custom_part: findCustomPartById(
                ref<DB>().table('part_option').column('custom_part_id'),
            ),
            ots_part: findOtsPartById(
                ref<DB>().table('part_option').column('off_the_shelf_part_id'),
            ),
            generic_part: findGenericPart(
                ref<DB>().table('part_option').column('generic_part_id'),
            ),
        })
        .select({
            id: true,
        })
        .many();
}

function findDesignItems(id: WhereClause<DB, 'design_item', 'id'>) {
    return query<DB>()
        .from('design_item')
        .where({
            id,
        })
        .include({
            part_options: findPartOptionByDesignItemId(
                ref<DB>().table('design_item').column('id'),
            ),
        })
        .select({
            id: true,
            notes: true,
            quantity: true,
            part: true,
        })
        .many();
}

function findGenericPart(id: WhereClause<DB, 'generic_part', 'id'>) {
    return query<DB>()
        .from('generic_part')
        .where({
            id,
        })
        .select({
            id: true,
            content: true,
            created_at: true,
        })
        .maybe();
}

export function findSolutionConfig(
    id: WhereClause<DB, 'solution_configuration', 'id'>,
) {
    return query<DB>()
        .from('solution_configuration')
        .where({
            id,
        })
        .include({
            sourcing_scenario: findSourcingScenario(
                ref<DB>()
                    .table('solution_configuration')
                    .column('sourcing_scenario'),
            ),
            design_items: findDesignItems(
                ref<DB>()
                    .table('solution_configuration')
                    .column('design_items'),
            ),
        })
        .select({
            id: true,
            notes: true,
        })
        .one();
}
