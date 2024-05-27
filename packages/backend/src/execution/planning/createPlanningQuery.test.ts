import { describe, expect, test } from 'vitest';
import { col } from '@synthql/queries';
import { store } from '../../tests/queries.v2';
import { createPlanningQuery } from './createPlanningQuery';
import { PlanningQuery } from '../types';
import { printPath } from '../../util/path/printPath';
import { from } from '../../tests/generated';

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

    test('many(store)', () => {
        const q = store().where({ store_id: 1 }).many();

        const planningQuery = createPlanningQuery(q);

        expect(simplifyQuery(planningQuery)).toEqual({
            children: [
                {
                    children: [
                        {
                            children: [],
                            from: 'city',
                            path: 'address.city',
                        },
                    ],
                    from: 'address',
                    path: 'address',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [],
                                    from: 'language',
                                    path: 'inventory.film.language',
                                },
                                {
                                    from: 'film_actor',
                                    path: 'inventory.film.filmActor',
                                    children: [
                                        {
                                            children: [],
                                            from: 'actor',
                                            path: 'inventory.film.filmActor.actors',
                                        },
                                    ],
                                },
                            ],
                            from: 'film',
                            path: 'inventory.film',
                        },
                    ],
                    from: 'inventory',
                    path: 'inventory',
                },
            ],
            from: 'store',
            path: '',
        });
    });

    test('maybe(store)', () => {
        const q = store()
            .where({ store_id: { in: [1, 2, 3] } })
            .maybe();

        expect(simplifyQuery(createPlanningQuery(q))).toEqual({
            from: 'store',
            path: '',
            children: [
                {
                    from: 'address',
                    path: 'address',
                    children: [
                        {
                            children: [],
                            from: 'city',
                            path: 'address.city',
                        },
                    ],
                },
                {
                    from: 'inventory',
                    path: 'inventory',
                    children: [
                        {
                            from: 'film',
                            path: 'inventory.film',
                            children: [
                                {
                                    from: 'language',
                                    path: 'inventory.film.language',
                                    children: [],
                                },
                                {
                                    from: 'film_actor',
                                    path: 'inventory.film.filmActor',
                                    children: [
                                        {
                                            from: 'actor',
                                            path: 'inventory.film.filmActor.actors',
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    test('sore => address => city', () => {
        const city = from('city')
            .columns('city_id', 'city')
            .where({
                city_id: col('address.city_id'),
            })
            .one();

        const address = from('address')
            .columns('address_id', 'address')
            .where({
                address_id: col('store.address_id'),
            })
            .include({
                city,
            })
            .one();

        const query = from('store')
            .select({ store_id: true })
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
                            from: 'city',
                            path: 'address.city',
                        },
                    ],
                    from: 'address',
                    path: 'address',
                },
            ],
            from: 'store',
            path: '',
        });
    });

    test('store with no children', () => {
        const q = createPlanningQuery(from('store').many());
        const simplified = simplifyQuery(q);

        expect(simplified).toEqual({
            children: [],
            from: 'store',
            path: '',
        });
    });

    test('store -> many(addresses)', () => {
        const q = createPlanningQuery(
            from('store')
                .include({
                    addresses: from('address').many(),
                })
                .many(),
        );
        const simplified = simplifyQuery(q);

        expect(simplified).toEqual({
            from: 'store',
            path: '',
            children: [
                {
                    from: 'address',
                    path: 'addresses',
                    children: [],
                },
            ],
        });
    });

    test('store -> many(addresses) -> many(cities)', () => {
        const q = createPlanningQuery(
            from('store')
                .include({
                    addresses: from('address')
                        .include({
                            cities: from('city').many(),
                        })
                        .many(),
                })
                .many(),
        );
        const simplified = simplifyQuery(q);

        expect(simplified).toEqual({
            from: 'store',
            path: '',
            children: [
                {
                    from: 'address',
                    path: 'addresses',
                    children: [
                        {
                            from: 'city',
                            path: 'addresses.cities',
                            children: [],
                        },
                    ],
                },
            ],
        });
    });

    test('store -> many(addresses) -> maybe(city) -> maybe(language)', () => {
        const language = from('language').maybe();
        const city = from('city').include({ language }).maybe();
        const addresses = from('address').include({ city }).many();
        const store = from('store').include({ addresses }).many();

        const q = createPlanningQuery(store);
        const simplified = simplifyQuery(q);

        expect(simplified).toEqual({
            from: 'store',
            path: '',
            children: [
                {
                    from: 'address',
                    path: 'addresses',
                    children: [
                        {
                            from: 'city',
                            path: 'addresses.city',
                            children: [
                                {
                                    from: 'language',
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

    test('maybe(store) -> many(addresses) -> maybe(city) -> maybe(language)', () => {
        const language = from('language').maybe();
        const city = from('city').include({ language }).maybe();
        const addresses = from('address').include({ city }).many();
        const store = from('store').include({ addresses }).maybe();

        const q = createPlanningQuery(store);
        const simplified = simplifyQuery(q);

        expect(simplified).toEqual({
            from: 'store',
            path: '',
            children: [
                {
                    from: 'address',
                    path: 'addresses',
                    children: [
                        {
                            from: 'city',
                            path: 'addresses.city',
                            children: [
                                {
                                    from: 'language',
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
