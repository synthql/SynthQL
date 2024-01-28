import { Table, WhereClause, query, ref } from '@synthql/queries';
import { DB } from './db';

export function from<TTable extends Table<DB>>(table: TTable) {
    return query<DB>().from(table);
}

export function actor() {
    return from('actor')
        .select({
            actor_id: true,
            first_name: true,
            last_name: true,
            last_update: true,
        })
        .groupingId('actor_id');
}

export function findActorById(actorId: number) {
    return actor().where({ actor_id: actorId }).maybe();
}

export function findActors() {
    return actor().where({}).many();
}

export function language() {
    return from('language')
        .select({
            language_id: true,
            name: true,
            last_update: true,
        })
        .groupingId('language_id');
}

export function findLanguageById(
    id: WhereClause<DB, 'language', 'language_id'>,
) {
    return language().where({ language_id: id });
}

export function movie() {
    const film_id = ref<DB>().table('film').column('film_id');
    const actor_id = ref<DB>().table('film_actor').column('actor_id');
    const languageId = ref<DB>().table('film').column('language_id');

    return from('film')
        .select({
            title: true,
            description: true,
            release_year: true,
        })
        .include({
            language: findLanguageById(languageId).one(),
            film_actor: from('film_actor').select({}).where({ film_id }).many(),
            actors: actor()
                .where({
                    actor_id,
                })
                .many(),
        })
        .groupingId('film_id');
}

export function country() {
    return from('country')
        .select({
            country_id: true,
            country: true,
            last_update: true,
        })
        .groupingId('country_id');
}

function findCountryById(id: WhereClause<DB, 'country', 'country_id'>) {
    return country().where({ country_id: id });
}

export function city() {
    return from('city')
        .select({
            city_id: true,
            city: true,
            last_update: true,
            country_id: true,
        })
        .groupingId('city_id')
        .include({
            country: findCountryById(
                ref<DB>().table('city').column('country_id'),
            ).one(),
        });
}

export function findCityById(id: WhereClause<DB, 'city', 'city_id'>) {
    return city().where({ city_id: id }).maybe();
}
