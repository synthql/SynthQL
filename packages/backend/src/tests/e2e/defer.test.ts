import { describe, test } from 'vitest';
import { col } from '../generated';
import { from } from '../queries';

describe('defer', () => {
    test('top level defer', async () => {
        const language = from('language')
            .columns('name')
            .defer()
            .where({
                language_id: col('film.film_id'),
            })
            .all();

        from('film').columns('film_id').include({
            language,
        });
    });
});
