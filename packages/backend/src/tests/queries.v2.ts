import { col } from "@synthql/queries";
import { expect, test } from "vitest";
import { describeQuery } from "../query/describeQuery";
import { from } from "./generated.schema";

export function language() {
    return from('public.language').columns('name', 'language_id')
}

export function actor() {
    return from('public.actor').columns('first_name', 'last_name', 'actor_id')
}

export function filmActor() {
    return from('public.film_actor').columns()
}


export function film() {
    return from('public.film')
        .columns('title', 'release_year')
        .include({
            language: language().where({ language_id: col('public.film.language_id') }).one(),
            filmActor: filmActor().where({ film_id: col('public.film.film_id') }).many(),
            actors: actor().where({ actor_id: col('public.film_actor.actor_id') }).many(),

        })
}

test('film', () => {
    expect(describeQuery(film().many())).toMatchInlineSnapshot(`
      "film: 
          actor: actor.actor_id = film_actor.actor_id
          film_actor: film_actor.film_id = film.film_id
          language: language.language_id = film.language_id"
    `)
})

export function city() {
    return from('public.city').columns('city_id', 'city')
}

export function address() {
    return from('public.address').columns('address_id', 'address').include({
        city: city().where({ city_id: col('public.address.city_id') }).one()
    })
}

test('address', () => {
    expect(describeQuery(address().many())).toMatchInlineSnapshot(`
      "address: 
          city: city.city_id = address.city_id"
    `)
})


export function inventory() {
    return from('public.inventory')
        .columns('inventory_id')
        .include({
            film: film().where({ film_id: col('public.inventory.film_id') }).one()
        })
}

test('inventory', () => {
    expect(describeQuery(inventory().many())).toMatchInlineSnapshot(`
      "inventory: 
          film: film.film_id = inventory.film_id
              actor: actor.actor_id = film_actor.actor_id
              film_actor: film_actor.film_id = film.film_id
              language: language.language_id = film.language_id"
    `)
})

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
    return from('public.store').columns('store_id', 'address_id')
        .include({
            address: address().where({ address_id: col('public.store.address_id') }).one(),
            inventory: inventory().where({ store_id: col('public.store.store_id') }).many()
        })
}


test('store', () => {
    expect(describeQuery(store().many())).toMatchInlineSnapshot(`
      "store: 
          inventory: inventory.store_id = store.store_id
          address: address.address_id = store.address_id
              film: film.film_id = inventory.film_id
              city: city.city_id = address.city_id
                  actor: actor.actor_id = film_actor.actor_id
                  film_actor: film_actor.film_id = film.film_id
                  language: language.language_id = film.language_id"
    `)
})
