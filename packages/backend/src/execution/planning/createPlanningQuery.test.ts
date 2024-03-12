import { describe, expect, test } from 'vitest';
import { store } from '../../tests/queries.v2';
import { createPlanningQuery } from './createPlanningQuery';
import { PlanningQuery } from '../types';
import { printPath } from '../../util/path/printPath';
import { mapQuery } from '../../query/mapQuery';

describe('createPlanningQuery', () => {
    test('createPlanningQuery', () => {
        const q = store().where({ store_id: 1 }).maybe();

        const planningQuery = createPlanningQuery(q);

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

        expect(simplifyQuery(planningQuery)).toEqual({
            children: [
                {
                    children: [
                        {
                            children: [],
                            from: 'public.city',
                            path: 'address.city',
                        },
                    ],
                    from: 'public.address',
                    path: 'address',
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
});
