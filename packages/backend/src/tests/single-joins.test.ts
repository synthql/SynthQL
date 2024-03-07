import { Where, col } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { collectLast } from '..';
import { execute } from '../execution/execute';
import { QueryProviderExecutor } from '../execution/executors/QueryProviderExecutor';
import { DB, from } from './generated.schema';
import { provideFilm } from './provideFilm';
import { provideLanguage } from './provideLanguage';



describe('single-joins', () => {
  test('n x 1 join from n(film) -> 1(language)', async () => {

    function findFilm(where: Where<DB, 'public.film'>) {
      const lang = from('public.language')
        .columns('name')
        .where({
          language_id: col('public.film.language_id'),
        })
        .one();

      return from('public.film')
        .where(where)
        .columns('film_id', 'title')
        .include({
          lang,
        })
        .groupingId('film_id')
        .many();
    }

    const q = findFilm({ film_id: 1 });
    const queryResult = await collectLast(
      execute<DB, typeof q>(q, {
        defaultSchema: 'public',
        executors: [
          new QueryProviderExecutor([provideLanguage(), provideFilm()]),
        ],
      }),
    );
    expect(queryResult).toMatchObject([
      {
        film_id: 4,
        lang: {
          name: 'French',
        },
        title: 'Amelie',
      },
      {
        film_id: 1,
        lang: {
          name: 'English',
        },
        title: 'The Matrix',
      },
      {
        film_id: 2,
        lang: {
          name: 'English',
        },
        title: 'The Matrix Reloaded',
      },
      {
        film_id: 3,
        lang: {
          name: 'English',
        },
        title: 'The Matrix Revolutions',
      },

    ]);
  });
});
