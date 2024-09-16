import { describe, expect, it } from 'vitest';
import { queryEngine } from './tests/queryEngine';
import { col, param } from '@synthql/queries';
import { from } from './tests/generated';
import { collectLast } from './util/generators/collectLast';

describe('QueryEngine', () => {
    // TODO: complete and (possibly) move tests
    it('1 + 1 equals 2', async () => {
        const params = {
            'where.actor_id': 1,
            'where.film_id': 1,
            'include.film.where.language_id': 1,
            'include.film.include.language.where.last_update':
                '2022-02-15 10:02:19+00',
        };

        function findFilmActor() {
            return from('film_actor')
                .where({
                    actor_id: param(),
                    film_id: param(),
                })
                .include({
                    film: from('film')
                        .where({
                            film_id: col('film_actor.film_id'),
                            language_id: param(),
                        })
                        .include({
                            language: from('language')
                                .where({
                                    language_id: col('film.language_id'),
                                    last_update: param(),
                                })
                                .maybe(),
                        })
                        .maybe(),
                })
                .maybe();
        }

        queryEngine.registerQueries([findFilmActor]);

        const q = findFilmActor();

        const result = await collectLast(
            queryEngine.executeRegisteredQuery(q.hash, params, {
                returnLastOnly: true,
            }),
        );

        expect(1 + 1).toEqual(2);
    });
});
