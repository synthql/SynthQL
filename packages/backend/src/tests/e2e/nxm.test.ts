import { QueryResult, Where, col } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { collectLast } from '../..';
import { execute } from '../../execution/execute';
import { QueryProviderExecutor } from '../../execution/executors/QueryProviderExecutor';
import { DB, from } from '../generated.schema';
import { provideFilm } from '../provideFilm';
import { provideLanguage } from '../provideLanguage';
import { store } from '../queries.v2';
import { pool, queryEngine } from '../queryEngine';
import { PgExecutor } from '../../execution/executors/PgExecutor';
import { describeQuery } from '../../query/describeQuery';

describe('n x m', () => {
    const q = store()
        .where({ store_id: { in: [1, 2, 3] } })
        .maybe();
    test(`${describeQuery(q)}`, async () => {
        const gen = execute<DB, typeof q>(q, {
            defaultSchema: 'public',
            executors: [new PgExecutor({ defaultSchema: 'public', pool })],
        });

        const queryResult = await collectLast(gen);

        expect(queryResult).toMatchInlineSnapshot(`
          {
            "address_id": 1,
            "store_id": 1,
          }
        `);
    });
});
