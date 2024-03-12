import { describe, expect, test } from 'vitest';
import { store } from '../../tests/queries.v2';
import { createPlanningQuery } from './createPlanningQuery';
import { PlanningQuery } from '../types';
import { printPath } from '../../util/path/printPath';
import { mapQuery } from '../../query/mapQuery';
import { from } from '../../tests/generated.schema';
import { col } from '@synthql/queries';

describe('createPlanningQuery', () => {
    function simplifyQuery(q: PlanningQuery): {
        path: string;
        from: string;
        children: any[];
    } {
        return {
            path: printPath(q.path),
            from: q.from,
            children: Object.values(q.include ?? {}).map((child) => {
                return simplifyQuery(child);
            }),
        };
    }

    test('store', () => {
        const q = store().where({ store_id: 1 }).maybe();

        const planningQuery = createPlanningQuery(q);

        expect(simplifyQuery(planningQuery)).toEqual({
            children: [
                {
                    children: [
                        {
                            children: [],
                            from: 'public.city',
                            path: '*.address.city',
                        },
                    ],
                    from: 'public.address',
                    path: '*.address',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [],
                                    from: 'public.language',
                                    path: '*.inventory.film.language',
                                },
                                {
                                    children: [],
                                    from: 'public.film_actor',
                                    path: '*.inventory.film.*.filmActor',
                                },
                                {
                                    children: [],
                                    from: 'public.actor',
                                    path: '*.inventory.film.*.actors',
                                },
                            ],
                            from: 'public.film',
                            path: '*.inventory.film',
                        },
                    ],
                    from: 'public.inventory',
                    path: '*.inventory',
                },
            ],
            from: 'public.store',
            path: '*',
        });
    });

    test('sore => address => city', () => {
        const city = from('public.city')
            .columns('city_id', 'city')
            .groupingId('city_id')
            .where({
                city_id: col('public.address.city_id'),
            })
            .one();

        const address = from('public.address')
            .columns('address_id', 'address')
            .groupingId('address_id')
            .where({
                address_id: col('public.store.address_id'),
            })
            .include({
                city,
            })
            .one();

        const query = from('public.store')
            .select({ store_id: true })
            .groupingId('store_id')
            .include({
                address,
            })
            .where({})
            .many();

        expect(simplifyQuery(createPlanningQuery(query))).toEqual({
            children: [
                {
                    children: [
                        {
                            children: [],
                            from: 'public.city',
                            path: '*.address.city',
                        },
                    ],
                    from: 'public.address',
                    path: '*.address',
                },
            ],
            from: 'public.store',
            path: '*',
        });
    });

    test('store with no children', () => {
        const q = createPlanningQuery(from('public.store').many());
        const simplified = simplifyQuery(q);

        expect(simplified).toEqual({
            children: [],
            from: 'public.store',
            path: '*',
        });
    });

    test('store -> many(addresses)', () => {
        const q = createPlanningQuery(
            from('public.store')
                .include({
                    addresses: from('public.address').many(),
                })
                .many(),
        );
        const simplified = simplifyQuery(q);

        expect(simplified).toEqual({
            from: 'public.store',
            path: '*',
            children: [
                {
                    from: 'public.address',
                    path: '*.addresses',
                    children: [],
                },
            ],
        });
    });

    test('store -> many(addresses) -> many(cities)', () => {
        const q = createPlanningQuery(
            from('public.store')
                .include({
                    addresses: from('public.address')
                        .include({
                            cities: from('public.city').many(),
                        })
                        .many(),
                })
                .many(),
        );
        const simplified = simplifyQuery(q);

        expect(simplified).toEqual({
            from: 'public.store',
            path: '*',
            children: [
                {
                    from: 'public.address',
                    path: '*.addresses',
                    children: [
                        {
                            from: 'public.city',
                            path: '*.addresses.*.cities',
                            children: [],
                        },
                    ],
                },
            ],
        });
    });

    test('store -> many(addresses) -> maybe(city) -> maybe(language)', () => {
        const language = from('public.language').maybe();
        const city = from('public.city').include({ language }).maybe();
        const addresses = from('public.address').include({ city }).many();
        const store = from('public.store').include({ addresses }).many();

        const q = createPlanningQuery(store);
        const simplified = simplifyQuery(q);

        expect(simplified).toEqual({
            from: 'public.store',
            path: '*',
            children: [
                {
                    from: 'public.address',
                    path: '*.addresses',
                    children: [
                        {
                            from: 'public.city',
                            path: '*.addresses.city',
                            children: [
                                {
                                    from: 'public.language',
                                    path: '*.addresses.city.language',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    test('maybe(store) -> many(addresses) -> maybe(city) -> maybe(language)', () => {
        const language = from('public.language').maybe();
        const city = from('public.city').include({ language }).maybe();
        const addresses = from('public.address').include({ city }).many();
        const store = from('public.store').include({ addresses }).maybe();

        const q = createPlanningQuery(store);
        const simplified = simplifyQuery(q);

        expect(simplified).toEqual({
            from: 'public.store',
            path: '',
            children: [
                {
                    from: 'public.address',
                    path: 'addresses',
                    children: [
                        {
                            from: 'public.city',
                            path: 'addresses.city',
                            children: [
                                {
                                    from: 'public.language',
                                    path: 'addresses.city.language',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });
});
