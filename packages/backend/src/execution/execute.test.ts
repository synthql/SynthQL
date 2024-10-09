import { col, query } from '@synthql/queries';
import { describe, expect, test } from 'vitest';
import { collectLast } from '..';
import { QueryProvider } from '../QueryProvider';
import { DB, schema } from '../tests/generated';
import { PgCatalogInt4, PgCatalogText } from '../tests/generated/db';
import { execute } from './execute';
import { QueryProviderExecutor } from './executors/QueryProviderExecutor';

interface DbWithVirtualTables extends DB {
    film_rating: {
        columns: {
            film_id: {
                type: PgCatalogInt4;
                selectable: true;
                includable: false;
                whereable: true;
                nullable: false;
                isPrimaryKey: true;
            };
            rating: {
                type: PgCatalogText;
                selectable: true;
                includable: false;
                whereable: false;
                nullable: false;
                isPrimaryKey: false;
            };
        };
    };
}

const schemaWithVirtualTables = {
    $schema: '',
    type: '',
    description: '',
    required: [],
    additionalProperties: false,
    $defs: {},
    properties: {
        ...schema.properties,
        film_rating: {
            type: '',
            description: '',
            required: [],
            additionalProperties: false,
            properties: {
                columns: {
                    type: '',
                    description: '',
                    required: [],
                    additionalProperties: false,
                    properties: {
                        film_id: {
                            type: '',
                            description: '',
                            required: [],
                            additionalProperties: false,
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
                            },
                        },
                        rating: {
                            type: '',
                            description: '',
                            required: [],
                            additionalProperties: false,
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const from = query<DbWithVirtualTables>(schemaWithVirtualTables).from;
const defaultSchema = 'public';

type ActorQueryProvider = QueryProvider<DbWithVirtualTables, 'actor'>;
type AddressQueryProvider = QueryProvider<DbWithVirtualTables, 'address'>;
type CityQueryProvider = QueryProvider<DbWithVirtualTables, 'city'>;
type CustomerQueryProvider = QueryProvider<DbWithVirtualTables, 'customer'>;
type FilmQueryProvider = QueryProvider<DbWithVirtualTables, 'film'>;
type FilmRatingQueryProvider = QueryProvider<
    DbWithVirtualTables,
    'film_rating'
>;
type LanguageQueryProvider = QueryProvider<DbWithVirtualTables, 'language'>;
type StaffQueryProvider = QueryProvider<DbWithVirtualTables, 'staff'>;
type StoreQueryProvider = QueryProvider<DbWithVirtualTables, 'store'>;

const actorProvider: ActorQueryProvider = {
    table: 'actor',
    execute: async ({ actor_id: actorIds }) => {
        const actors = [
            { actor_id: 1, first_name: 'John', last_name: 'Doe' },
            { actor_id: 2, first_name: 'Jane', last_name: 'Doe' },
            { actor_id: 3, first_name: 'John', last_name: 'Smith' },
        ];

        if (actorIds === undefined || actorIds.length === 0) {
            return actors;
        }

        return actors.filter((a) => actorIds.includes(a.actor_id));
    },
};

const addressProvider: AddressQueryProvider = {
    table: 'address',
    execute: async ({ address_id: addressIds }) => {
        const addresses = [
            { address_id: 1, city_id: 1, address: '1 Abuja way' },
            { address_id: 2, city_id: 2, address: '2 Enugu way' },
            { address_id: 3, city_id: 3, address: '3 Jos way' },
        ];

        if (addressIds === undefined || addressIds.length === 0) {
            return addresses;
        }

        return addresses.filter((a) => addressIds.includes(a.address_id));
    },
};

const cityProvider: CityQueryProvider = {
    table: 'city',
    execute: async ({ city_id: cityIds }) => {
        const cities = [
            {
                city_id: 1,
                name: 'Abuja',
            },
            {
                city_id: 2,
                name: 'Enugu',
            },
            {
                city_id: 3,
                name: 'Jos',
            },
        ];

        if (cityIds === undefined || cityIds.length === 0) {
            return cities;
        }

        return cities.filter((l) => cityIds.includes(l.city_id));
    },
};

const customerProvider: CustomerQueryProvider = {
    table: 'customer',
    execute: async ({ customer_id: customerIds }) => {
        const customers = [
            {
                customer_id: 1,
                address_id: 1,
                store_id: 1,
                first_name: 'Captain',
                last_name: 'America',
            },
            {
                customer_id: 2,
                address_id: 2,
                store_id: 2,
                first_name: 'War',
                last_name: 'Machine',
            },
            {
                customer_id: 3,
                address_id: 3,
                store_id: 3,
                first_name: 'Black',
                last_name: 'Widow',
            },
        ];

        if (customerIds === undefined || customerIds.length === 0) {
            return customers;
        }

        return customers.filter((a) => customerIds.includes(a.customer_id));
    },
};

const filmProvider: FilmQueryProvider = {
    table: 'film',
    execute: async ({ film_id: filmIds }) => {
        const films = [
            {
                film_id: 1,
                title: 'The Matrix',
            },
            {
                film_id: 2,
                title: 'The Matrix Reloaded',
            },
            {
                film_id: 3,
                title: 'The Matrix Revolutions',
            },
            {
                film_id: 4,
                title: 'The Fifth element',
            },
        ];

        if (filmIds === undefined || filmIds.length === 0) {
            return films;
        }

        return films.filter((f) => filmIds.includes(f.film_id));
    },
};

const filmRatingProvider: FilmRatingQueryProvider = {
    table: 'film_rating',
    execute: async ({ film_id: filmIds }) => {
        const filmRatings = [
            {
                film_id: 1,
                rating: 'PG-13',
            },
            {
                film_id: 2,
                rating: 'R',
            },
            {
                film_id: 3,
                rating: 'R',
            },
            {
                film_id: 4,
                rating: 'PG-13',
            },
        ];

        if (filmIds === undefined || filmIds.length === 0) {
            return filmRatings;
        }

        return filmRatings.filter((f) => filmIds.includes(f.film_id));
    },
};

const languageProvider: LanguageQueryProvider = {
    table: 'language',
    execute: async ({ language_id: languageIds }) => {
        const languages = [
            {
                language_id: 1,
                name: 'English',
            },
            {
                language_id: 2,
                name: 'German',
            },
            {
                language_id: 3,
                name: 'Spanish',
            },
            {
                language_id: 4,
                name: 'French',
            },
        ];

        if (languageIds === undefined || languageIds.length === 0) {
            return languages;
        }

        return languages.filter((l) => languageIds.includes(l.language_id));
    },
};

const staffProvider: StaffQueryProvider = {
    table: 'staff',
    execute: async ({ staff_id: staffIds }) => {
        const staffs = [
            {
                staff_id: 1,
                first_name: 'Captain',
                last_name: 'Cold',
            },
            {
                staff_id: 2,
                first_name: 'Martian',
                last_name: 'Manhunter',
            },
            {
                staff_id: 3,
                first_name: 'Heat',
                last_name: 'Wave',
            },
        ];

        if (staffIds === undefined || staffIds.length === 0) {
            return staffs;
        }

        return staffs.filter((l) => staffIds.includes(l.staff_id));
    },
};

const storeProvider: StoreQueryProvider = {
    table: 'store',
    execute: async ({ store_id: storeIds }) => {
        const stores = [
            { store_id: 1, address_id: 1, manager_staff_id: 1 },
            { store_id: 2, address_id: 2, manager_staff_id: 2 },
            { store_id: 3, address_id: 3, manager_staff_id: 3 },
        ];

        if (storeIds === undefined || storeIds.length === 0) {
            return stores;
        }

        return stores.filter((s) => storeIds.includes(s.store_id));
    },
};

describe('execute', () => {
    test('1 level deep deferred queries', async () => {
        const store = from('store')
            .where({
                store_id: col('customer.store_id'),
            })
            .lazy()
            .one();

        const customer_address = from('address')
            .where({
                address_id: col('customer.address_id'),
            })
            .lazy()
            .one();

        const q = from('customer').include({ customer_address, store }).many();

        const result = await collectLast(
            execute<DbWithVirtualTables, typeof q>(q, {
                executors: [
                    new QueryProviderExecutor([
                        addressProvider,
                        customerProvider,
                        storeProvider,
                    ]),
                ],
                defaultSchema,
            }),
        );

        expect(result).toEqual([
            {
                customer_id: 1,
                address_id: 1,
                store_id: 1,
                first_name: 'Captain',
                last_name: 'America',
                customer_address: {
                    status: 'done',
                    data: {
                        address_id: 1,
                        city_id: 1,
                        address: '1 Abuja way',
                    },
                },
                store: {
                    status: 'done',
                    data: {
                        store_id: 1,
                        address_id: 1,
                        manager_staff_id: 1,
                    },
                },
            },
            {
                customer_id: 2,
                address_id: 2,
                store_id: 2,
                first_name: 'War',
                last_name: 'Machine',
                customer_address: {
                    status: 'done',
                    data: {
                        address_id: 2,
                        city_id: 2,
                        address: '2 Enugu way',
                    },
                },
                store: {
                    status: 'done',
                    data: {
                        store_id: 2,
                        address_id: 2,
                        manager_staff_id: 2,
                    },
                },
            },
            {
                customer_id: 3,
                address_id: 3,
                store_id: 3,
                first_name: 'Black',
                last_name: 'Widow',
                customer_address: {
                    status: 'done',
                    data: {
                        address_id: 3,
                        city_id: 3,
                        address: '3 Jos way',
                    },
                },
                store: {
                    status: 'done',
                    data: {
                        store_id: 3,
                        address_id: 3,
                        manager_staff_id: 3,
                    },
                },
            },
        ]);
    });

    // TODO: fix the underlying setIn fn to get this to work
    test.skip('2 level deep deferred queries', async () => {
        const store_address = from('address')
            .where({
                address_id: col('store.address_id'),
            })
            .lazy()
            .one();

        const store = from('store')
            .where({
                store_id: col('customer.store_id'),
            })
            .include({ store_address })
            .lazy()
            .one();

        const customer_city = from('city')
            .where({
                city_id: col('address.city_id'),
            })
            .lazy()
            .one();

        const customer_address = from('address')
            .where({
                address_id: col('customer.address_id'),
            })
            .include({ customer_city })
            .lazy()
            .one();

        const q = from('customer').include({ customer_address, store }).many();

        const result = execute<DbWithVirtualTables, typeof q>(q, {
            executors: [
                new QueryProviderExecutor([
                    addressProvider,
                    cityProvider,
                    customerProvider,
                    storeProvider,
                ]),
            ],
            defaultSchema,
        });
    });

    test('single provider', async () => {
        const q = from('actor')
            .columns('actor_id', 'first_name', 'last_name')
            .where({ actor_id: 1 })
            .one();

        const result = await collectLast(
            execute<DbWithVirtualTables, typeof q>(q, {
                executors: [new QueryProviderExecutor([actorProvider])],
                defaultSchema,
            }),
        );

        expect(result).toEqual({
            actor_id: 1,
            first_name: 'John',
            last_name: 'Doe',
        });
    });

    test('film with film_rating', async () => {
        function findFilmWithRating(filmId: number) {
            return from('film')
                .columns('film_id', 'title')
                .where({ film_id: filmId })
                .include({
                    rating: from('film_rating')
                        .columns('rating')
                        .where({ film_id: col('film.film_id') })
                        .one(),
                })
                .one();
        }

        const q = findFilmWithRating(1);

        const result = await collectLast(
            execute<DbWithVirtualTables, typeof q>(q, {
                executors: [
                    new QueryProviderExecutor([
                        filmProvider,
                        filmRatingProvider,
                    ]),
                ],
                defaultSchema,
            }),
        );

        expect(result).toMatchObject({
            film_id: 1,
            title: 'The Matrix',
            rating: {
                rating: 'PG-13',
            },
        });

        const q2 = findFilmWithRating(2);

        const result2 = await collectLast(
            execute<DbWithVirtualTables, typeof q2>(q2, {
                executors: [
                    new QueryProviderExecutor([
                        filmProvider,
                        filmRatingProvider,
                    ]),
                ],
                defaultSchema,
            }),
        );

        expect(result2).toMatchObject({
            film_id: 2,
            title: 'The Matrix Reloaded',
            rating: {
                rating: 'R',
            },
        });
    });
});
