import { col } from '@synthql/queries';
import { from } from './generated';

export function language() {
    return from('language').columns('name', 'language_id');
}

export function actor() {
    return from('actor').columns('first_name', 'last_name', 'actor_id');
}

export function filmActor() {
    return from('film_actor').columns().groupBy('actor_id', 'film_id');
}

export function film() {
    return from('film')
        .columns('title', 'release_year')
        .include({
            language: language()
                .where({ language_id: col('film.language_id') })
                .maybe(),
            filmActor: filmActor()
                .where({ film_id: col('film.film_id') })
                .include({
                    actors: actor()
                        .where({ actor_id: col('film_actor.actor_id') })
                        .many(),
                })
                .many(),
        });
}

export function city() {
    return from('city').columns('city_id', 'city');
}

export function address() {
    return from('address')
        .columns('address_id', 'address')
        .include({
            city: city()
                .where({ city_id: col('address.city_id') })
                .one(),
        });
}

export function inventory() {
    return from('inventory')
        .columns('inventory_id')
        .include({
            film: film()
                .where({ film_id: col('inventory.film_id') })
                .one(),
        });
}

/**
 * - store
 *    - address
 *        - city
 *    - inventory
 *        - film
 *           - language
 *           - film_actor
 *           - actors
 */
export function store() {
    return from('store')
        .columns('store_id', 'address_id')
        .include({
            address: address()
                .where({ address_id: col('store.address_id') })
                .one(),
            inventory: inventory()
                .where({ store_id: col('store.store_id') })
                .many(),
        });
}
