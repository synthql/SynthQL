import type { ColumnType } from 'kysely';
import { PgSchema } from '../introspection/introspectSchema';

export type Generated<T> =
    T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type MpaaRating = 'G' | 'NC-17' | 'PG' | 'PG-13' | 'R';

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Actor {
    actor_id: Generated<number>;
    first_name: string;
    last_name: string;
    last_update: Generated<Timestamp>;
}

export interface ActorInfo {
    actor_id: number | null;
    film_info: string | null;
    first_name: string | null;
    last_name: string | null;
}

export interface Address {
    address: string;
    address_id: Generated<number>;
    address2: string | null;
    city_id: number;
    district: string;
    last_update: Generated<Timestamp>;
    phone: string;
    postal_code: string | null;
}

export interface Category {
    category_id: Generated<number>;
    last_update: Generated<Timestamp>;
    name: string;
}

export interface City {
    city: string;
    city_id: Generated<number>;
    country_id: number;
    last_update: Generated<Timestamp>;
}

export interface Country {
    country: string;
    country_id: Generated<number>;
    last_update: Generated<Timestamp>;
}

export interface Customer {
    active: number | null;
    activebool: Generated<boolean>;
    address_id: number;
    create_date: Generated<Timestamp>;
    customer_id: Generated<number>;
    email: string | null;
    first_name: string;
    last_name: string;
    last_update: Generated<Timestamp | null>;
    store_id: number;
}

export interface CustomerList {
    'address': string | null;
    'city': string | null;
    'country': string | null;
    'id': number | null;
    'name': string | null;
    'notes': string | null;
    'phone': string | null;
    'sid': number | null;
    'zip code': string | null;
}

export interface Film {
    description: string | null;
    film_id: Generated<number>;
    fulltext: string;
    language_id: number;
    last_update: Generated<Timestamp>;
    length: number | null;
    original_language_id: number | null;
    rating: Generated<MpaaRating | null>;
    release_year: number | null;
    rental_duration: Generated<number>;
    rental_rate: Generated<Numeric>;
    replacement_cost: Generated<Numeric>;
    special_features: string[] | null;
    title: string;
}

export interface FilmActor {
    actor_id: number;
    film_id: number;
    last_update: Generated<Timestamp>;
}

export interface FilmCategory {
    category_id: number;
    film_id: number;
    last_update: Generated<Timestamp>;
}

export interface FilmList {
    actors: string | null;
    category: string | null;
    description: string | null;
    fid: number | null;
    length: number | null;
    price: Numeric | null;
    rating: MpaaRating | null;
    title: string | null;
}

export interface Inventory {
    film_id: number;
    inventory_id: Generated<number>;
    last_update: Generated<Timestamp>;
    store_id: number;
}

export interface Language {
    language_id: Generated<number>;
    last_update: Generated<Timestamp>;
    name: string;
}

export interface NicerButSlowerFilmList {
    actors: string | null;
    category: string | null;
    description: string | null;
    fid: number | null;
    length: number | null;
    price: Numeric | null;
    rating: MpaaRating | null;
    title: string | null;
}

export interface PaymentP202201 {
    amount: Numeric;
    customer_id: number;
    payment_date: Timestamp;
    payment_id: Generated<number>;
    rental_id: number;
    staff_id: number;
}

export interface PaymentP202202 {
    amount: Numeric;
    customer_id: number;
    payment_date: Timestamp;
    payment_id: Generated<number>;
    rental_id: number;
    staff_id: number;
}

export interface PaymentP202203 {
    amount: Numeric;
    customer_id: number;
    payment_date: Timestamp;
    payment_id: Generated<number>;
    rental_id: number;
    staff_id: number;
}

export interface PaymentP202204 {
    amount: Numeric;
    customer_id: number;
    payment_date: Timestamp;
    payment_id: Generated<number>;
    rental_id: number;
    staff_id: number;
}

export interface PaymentP202205 {
    amount: Numeric;
    customer_id: number;
    payment_date: Timestamp;
    payment_id: Generated<number>;
    rental_id: number;
    staff_id: number;
}

export interface PaymentP202206 {
    amount: Numeric;
    customer_id: number;
    payment_date: Timestamp;
    payment_id: Generated<number>;
    rental_id: number;
    staff_id: number;
}

export interface PaymentP202207 {
    amount: Numeric;
    customer_id: number;
    payment_date: Timestamp;
    payment_id: Generated<number>;
    rental_id: number;
    staff_id: number;
}

export interface Rental {
    customer_id: number;
    inventory_id: number;
    last_update: Generated<Timestamp>;
    rental_date: Timestamp;
    rental_id: Generated<number>;
    return_date: Timestamp | null;
    staff_id: number;
}

export interface SalesByFilmCategory {
    category: string | null;
    total_sales: Numeric | null;
}

export interface SalesByStore {
    manager: string | null;
    store: string | null;
    total_sales: Numeric | null;
}

export interface Staff {
    active: Generated<boolean>;
    address_id: number;
    email: string | null;
    first_name: string;
    last_name: string;
    last_update: Generated<Timestamp>;
    password: string | null;
    picture: Buffer | null;
    staff_id: Generated<number>;
    store_id: number;
    username: string;
}

export interface StaffList {
    'address': string | null;
    'city': string | null;
    'country': string | null;
    'id': number | null;
    'name': string | null;
    'phone': string | null;
    'sid': number | null;
    'zip code': string | null;
}

export interface Store {
    address_id: number;
    last_update: Generated<Timestamp>;
    manager_staff_id: number;
    store_id: Generated<number>;
}

export interface DB {
    actor: Actor;
    actor_info: ActorInfo;
    address: Address;
    category: Category;
    city: City;
    country: Country;
    customer: Customer;
    customer_list: CustomerList;
    film: Film;
    film_actor: FilmActor;
    film_category: FilmCategory;
    film_list: FilmList;
    inventory: Inventory;
    language: Language;
    nicer_but_slower_film_list: NicerButSlowerFilmList;
    payment_p2022_01: PaymentP202201;
    payment_p2022_02: PaymentP202202;
    payment_p2022_03: PaymentP202203;
    payment_p2022_04: PaymentP202204;
    payment_p2022_05: PaymentP202205;
    payment_p2022_06: PaymentP202206;
    payment_p2022_07: PaymentP202207;
    rental: Rental;
    sales_by_film_category: SalesByFilmCategory;
    sales_by_store: SalesByStore;
    staff: Staff;
    staff_list: StaffList;
    store: Store;
}
