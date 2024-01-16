import { DB, JsonValue, TypesCustomPriceTypeEnum, Json } from 'kysely-codegen';
import { describe, expect, test } from 'vitest';
import { Column, Query, Table, WhereClause } from '../types/Query';
import { QueryResult } from '../types/QueryResult';
import { ref, query } from '../ref';

type LumiQuery<T extends Table<DB>> = Query<DB, T>;

describe('Query', () => {
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

    function findLazyManufacturerById(
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
            .lazy()
            .one();
    }

    function findSourcingScenario(
        id: WhereClause<DB, 'sourcing_scenario', 'id'>,
    ) {
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
                    ref<DB>()
                        .table('part_option')
                        .column('off_the_shelf_part_id'),
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

    function findSolutionConfig(
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

    test('public.manufacturers', () => {
        const q = findManufacturerById('some id');

        const result: QueryResult<DB, typeof q> = {
            id: '',
            name: '',
            alternative_names: [],
        };

        const _ = result satisfies {
            id: string;
            name: string;
            alternative_names: string[];
        };
    });

    test('custom_part_offer', () => {
        const query = {
            from: 'custom_part_offer',
            select: {
                id: true,
                notes: true,
                price_points: true,
                price_type: true,
                offer_url: true,
                one_time_costs: true,
            },
            where: {
                id: 'some id',
            },
        } satisfies LumiQuery<'custom_part_offer'>;

        const result: QueryResult<DB, typeof query> = {
            id: '',
            notes: '',
            offer_url: '',
            one_time_costs: {},
            price_points: [],
            price_type: 'list_price',
        };

        const _ = result satisfies {
            id: string;
            notes: string | null;
            offer_url: string | null;
            one_time_costs: JsonValue;
            price_points: JsonValue;
            price_type: TypesCustomPriceTypeEnum | null;
        };
    });

    test('join parts with manfuacturers', () => {
        const refManufacturer = ref<DB>()
            .table('public.off_the_shelf_part')
            .column('manufacturer');

        function findOffTheShelfPartById() {
            return query<DB>()
                .from('public.off_the_shelf_part')
                .where({
                    id: 'some id',
                })
                .include({
                    manufacturer: findManufacturerById(refManufacturer),
                })
                .select({
                    id: true,
                    mpn: true,
                })
                .one();
        }

        const q = findOffTheShelfPartById();

        const result: QueryResult<DB, typeof q> = {
            id: '',
            mpn: '',
            manufacturer: {
                id: '',
                alternative_names: [],
                name: '',
            },
        };
    });

    test('find solution config', () => {
        const solutionConfig = findSolutionConfig('some id');

        expect(solutionConfig).toMatchSnapshot();

        const result: QueryResult<DB, typeof solutionConfig> = {
            id: '',
            notes: '',
            sourcing_scenario: {
                id: '',
                name: '',
                solution_preference: {},
            },
            design_items: [
                {
                    id: '',
                    notes: '',
                    quantity: {},
                    part_options: [
                        {
                            id: '',
                            ots_part: {
                                id: '',
                                manufacturer: {
                                    id: '',
                                    name: '',
                                    alternative_names: [],
                                },
                                mpn: '',
                            },
                            custom_part: {
                                id: '',
                                description: '',
                                reach_compliant: 'compliant',
                                part_type: {},
                                rohs_compliant: 'compliant_with_exemption',
                            },
                            generic_part: null,
                        },
                        {
                            id: '',
                            ots_part: null,
                            custom_part: null,
                            generic_part: null,
                        },
                    ],
                },
            ],
        };
    });

    test('lazy query', () => {
        const q = query<DB>()
            .from('public.off_the_shelf_part')
            .include({
                manufacturer: findLazyManufacturerById('some ID'),
            })
            .select({
                id: true,
                mpn: true,
            })
            .one();

        const resultPending: QueryResult<DB, typeof q> = {
            id: '',
            mpn: '',
            manufacturer: {
                status: 'pending',
            },
        };

        const resultDone: QueryResult<DB, typeof q> = {
            id: '',
            mpn: '',
            manufacturer: {
                status: 'done',
                data: {
                    id: '',
                    name: '',
                    alternative_names: [],
                },
            },
        };
    });
});


