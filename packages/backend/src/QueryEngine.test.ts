import { describe, expect, it } from 'vitest';
import { col, param } from '@synthql/queries';
import { queryEngine } from './tests/queryEngine';
import { from } from './tests/generated';

describe('QueryEngine', () => {
    it('registerQueries + executeRegisteredQuery', async () => {
        queryEngine.registerQueries([findFilmActor]);

        const params = {
            'where.actor_id': 2,
            'where.film_id': 47,
            'include.film.where.language_id': 3,
            'include.film.include.language.where.last_update':
                '2022-02-15 10:02:19+00',
        };

        const parameterizedQueryResult =
            await queryEngine.executeRegisteredQueryAndWait({
                queryId: findFilmActor().hash,
                params,
            });

        const regularQuery = findFilmActor({
            actor_id: params['where.actor_id'],
            film_id: params['where.film_id'],
            language_id: params['include.film.where.language_id'],
            last_update:
                params['include.film.include.language.where.last_update'],
        });

        const regularQueryResult =
            await queryEngine.executeAndWait(regularQuery);

        expect(parameterizedQueryResult).toEqual(regularQueryResult);
    });
});

function findFilmActor(data?: {
    actor_id?: number;
    film_id?: number;
    language_id?: number;
    last_update?: string;
}) {
    return from('film_actor')
        .where({
            actor_id: data?.actor_id ?? param(),
            film_id: data?.film_id ?? param(),
        })
        .include({
            film: from('film')
                .where({
                    film_id: col('film_actor.film_id'),
                    language_id: data?.language_id ?? param(),
                })
                .include({
                    language: from('language')
                        .where({
                            language_id: col('film.language_id'),
                            last_update: data?.last_update ?? param(),
                        })
                        .maybe(),
                })
                .maybe(),
        })
        .maybe();
}
