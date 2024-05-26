import { describe, expect, test } from 'vitest';
import { describeQuery } from '../../query/describeQuery';
import { provideFilm } from '../../tests/provideFilm';
import { provideLanguage } from '../../tests/provideLanguage';
import { film, store } from '../../tests/queries.v2';
import { pool } from '../../tests/queryEngine';
import { PgExecutor } from '../executors/PgExecutor';
import { QueryProviderExecutor } from '../executors/QueryProviderExecutor';
import { createExecutionPlan } from './createExecutionPlan';
import { simplifyPlan } from './simplifyPlan';
import { DB } from '../../tests/generated';

describe('createExecutionPlan', () => {
    test('find film', async () => {
        const q = film().where({ film_id: 1 }).maybe();

        const qpe = new QueryProviderExecutor([
            provideLanguage(),
            provideFilm(),
        ]);
        const pgExecutor = new PgExecutor({
            pool,
            defaultSchema: 'public',
            qpe,
        });
        const plan = createExecutionPlan(q, {
            defaultSchema: 'public',
            executors: [pgExecutor, qpe],
        });

        const simplified = await simplifyPlan(plan);

        expect(simplified).toEqual({
            executor: 'QueryProviderExecutor',
            from: 'film',
            children: [
                {
                    children: [],
                    executor: 'QueryProviderExecutor',
                    from: 'language',
                },
                {
                    children: [],
                    executor: 'PgExecutor',
                    from: 'film_actor, actor',
                },
            ],
        });

        expect(describeQuery(plan.root.query)).toEqual(`film:`);
    });

    test('find film with only PgExecutor', async () => {
        const q = film().where({ film_id: 1 }).maybe();

        const qpe = new QueryProviderExecutor([]);
        const pgExecutor = new PgExecutor({
            pool,
            defaultSchema: 'public',
            qpe,
        });
        const plan = createExecutionPlan(q, {
            defaultSchema: 'public',
            executors: [pgExecutor, qpe],
        });

        const simplified = await simplifyPlan(plan);

        expect(simplified).toEqual({
            children: [
                {
                    children: [],
                    executor: 'PgExecutor',
                    from: 'actor',
                },
            ],
            executor: 'PgExecutor',
            from: 'film, film_actor, language',
        });
    });

    test('store', async () => {
        const q = store().where({ store_id: 1 }).maybe();

        const qpe = new QueryProviderExecutor([]);
        const pgExecutor = new PgExecutor({
            pool,
            defaultSchema: 'public',
            qpe,
        });
        const plan = createExecutionPlan(q, {
            defaultSchema: 'public',
            executors: [pgExecutor, qpe],
        });

        const simplified = await simplifyPlan(plan);
        expect(simplified).toEqual({
            children: [
                {
                    children: [
                        {
                            children: [],
                            executor: 'PgExecutor',
                            from: 'actor',
                        },
                    ],
                    executor: 'PgExecutor',
                    from: 'film, film_actor, language',
                },
                {
                    children: [],
                    executor: 'PgExecutor',
                    from: 'city',
                },
            ],
            executor: 'PgExecutor',
            from: 'store, inventory, address',
        });
    });
});
