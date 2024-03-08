import { QueryProvider } from "../QueryProvider";
import { assertArray } from "../util/asserts/assertArray";
import { assertHasKey } from "../util/asserts/assertHasKey";
import { DB } from "./generated.schema";

type Film = Pick<DB['public.film'], 'film_id' | 'title' | 'language_id'>;

const defaultFilms: Film[] = [
    {
        film_id: 4,
        title: 'Amelie',
        language_id: 2,
    },
    {
        film_id: 1,
        title: 'The Matrix',
        language_id: 1,
    },
    {
        film_id: 2,
        title: 'The Matrix Reloaded',
        language_id: 1,
    },
    {
        film_id: 3,
        title: 'The Matrix Revolutions',
        language_id: 1,
    },
]

export function provideFilm(films = defaultFilms): QueryProvider {
    return {
        table: 'public.film',
        execute: async (q): Promise<Film[]> => {
            assertHasKey(q.where, 'film_id')
            const film_id = q.where.film_id;

            if (typeof film_id === 'number') {
                return films.filter((f) => f.film_id === film_id);
            }

            assertHasKey(film_id, 'in')
            const ids = film_id.in;
            assertArray(ids)

            return films.filter((f) => ids.includes(f.film_id));
        },
    }
};