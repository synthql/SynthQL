import { describe, expect, it } from 'vitest';
import { col, param } from '@synthql/queries';
import { queryEngine } from './tests/queryEngine';
import { from } from './tests/generated';

const params = {
    'where.actor_id': 2,
    'where.film_id': 47,
    'include.film.where.language_id': 3,
    'include.film.include.language.where.last_update': '2022-02-15 10:02:19+00',
};

describe('QueryEngine', () => {
    it('registerQueries + executeRegisteredQuery', async () => {
        queryEngine.registerQueries([() => findFilmActor(false).maybe()]);

        const parameterizedQueryResult =
            await queryEngine.executeRegisteredQueryAndWait({
                queryId: findFilmActor(false).maybe().hash,
                params,
            });

        const regularQueryResult = await queryEngine.executeAndWait(
            findFilmActor(true).maybe(),
        );

        expect(parameterizedQueryResult).toEqual(regularQueryResult);
    });
});

function findFilmActor(regular: boolean) {
    return from('film_actor')
        .where({
            actor_id: regular ? params['where.actor_id'] : param(),
            film_id: regular ? params['where.film_id'] : param(),
        })
        .include({
            film: from('film')
                .where({
                    film_id: col('film_actor.film_id'),
                    language_id: regular
                        ? params['include.film.where.language_id']
                        : param(),
                })
                .include({
                    language: from('language')
                        .where({
                            language_id: col('film.language_id'),
                            last_update: regular
                                ? params[
                                      'include.film.include.language.where.last_update'
                                  ]
                                : param(),
                        })
                        .maybe(),
                })
                .maybe(),
        });
}
