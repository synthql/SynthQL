import { describe, expect, it } from 'vitest';
import { col, param, RegisteredQuery, RegularQuery } from '@synthql/queries';
import { createBody } from './createBody';
import { from } from './test/generated';

const params = {
    'where.actor_id': 2,
    'where.film_id': 47,
    'include.film.where.language_id': 3,
    'include.film.include.language.where.last_update': '2022-02-15 10:02:19+00',
};

describe('createBody', () => {
    it('Parameterized query returns a RegisteredQueryRequest', async () => {
        const request = createBody(findFilmActor(false).maybe());

        expect(request.type).toEqual(RegisteredQuery);
    });

    it('Regular query without name() returns a RegularQueryRequest', async () => {
        const request = createBody(findFilmActor(true).maybe());

        expect(request.type).toEqual(RegularQuery);
    });

    it('Regular query with name() returns a RegisteredQueryRequest', async () => {
        const request = createBody(
            findFilmActor(true)
                .name('findFilmActorWithRegularQueryWithName')
                .maybe(),
        );

        expect(request.type).toEqual(RegisteredQuery);
    });

    it('Regular query with empty string name() returns a RegularQueryRequest', async () => {
        const request = createBody(findFilmActor(true).name('').maybe());

        expect(request.type).toEqual(RegularQuery);
    });
});

function findFilmActor(regular: boolean) {
    return from('film_actor')
        .where({
            actor_id: regular
                ? params['where.actor_id']
                : param(params['where.actor_id']),
            film_id: regular
                ? params['where.film_id']
                : param(params['where.film_id']),
        })
        .include({
            film: from('film')
                .where({
                    film_id: col('film_actor.film_id'),
                    language_id: regular
                        ? params['include.film.where.language_id']
                        : param(params['include.film.where.language_id']),
                })
                .include({
                    language: from('language')
                        .where({
                            language_id: col('film.language_id'),
                            last_update: regular
                                ? params[
                                      'include.film.include.language.where.last_update'
                                  ]
                                : param(
                                      params[
                                          'include.film.include.language.where.last_update'
                                      ],
                                  ),
                        })
                        .maybe(),
                })
                .maybe(),
        });
}
