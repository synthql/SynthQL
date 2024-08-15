import { describe, test } from 'vitest';
import { QueryProviderInput } from './QueryProviderInput';
import { DB } from '../tests/generated';
import { Table } from '@synthql/queries';
import { PgCatalogInt4, PgCatalogText } from '../tests/generated/db';

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

describe('QueryProviderInput', () => {
    function fakeQueryResult<
        DB,
        TTable extends Table<DB>,
    >(): QueryProviderInput<DB, TTable> {
        return {} as any;
    }

    test('actor that has columns with `{ whereable: true }`', () => {
        const result = fakeQueryResult<DB, 'actor'>();

        result satisfies {
            actor_id: number[] | undefined;
            first_name: string[] | undefined;
            last_name: string[] | undefined;
            last_update: string[] | undefined;
        };
    });

    test('film_rating that has columns with `{ whereable: false }`', () => {
        const result = fakeQueryResult<DbWithVirtualTables, 'film_rating'>();

        result satisfies {
            film_id: number[] | undefined;
            rating?: never;
        };
    });
});
