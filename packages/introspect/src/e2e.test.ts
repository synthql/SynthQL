import { describe, expect, test } from 'vitest';
import * as prettier from 'prettier';
import { Pool, types } from 'pg';
import { generate } from './generate';
import {
    createTableQuery,
    deleteTableQuery,
    insertTableQuery,
    selectTableQuery,
} from './tests/sqlQueries';

// Use the OIDs imported from pg.types to set custom type parsers
types.setTypeParser(types.builtins.DATE, (value) => value);
types.setTypeParser(types.builtins.TIMESTAMP, (value) => value);
types.setTypeParser(types.builtins.TIMESTAMPTZ, (value) => value);

// Database connection configuration
const client = new Pool({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/postgres',
    max: 10,
});

describe('e2e', () => {
    test('Generate from Pagila', async () => {
        const prettierOptions = await prettier.resolveConfig(
            '../../.prettier.config.js',
        );

        expect(prettierOptions).not.toBe(null);

        // Generate in `backend` package
        await generate({
            connectionString:
                'postgresql://postgres:postgres@localhost:5432/postgres',
            includeSchemas: ['public'],
            defaultSchema: 'public',
            outDir: '../backend/src/tests/generated',
            formatter: (str) =>
                prettier.format(str, {
                    parser: 'typescript',
                    ...prettierOptions,
                }),
        });

        // Generate in `handler-express` package
        await generate({
            connectionString:
                'postgresql://postgres:postgres@localhost:5432/postgres',
            includeSchemas: ['public'],
            defaultSchema: 'public',
            outDir: '../handler-express/src/tests/generated',
            formatter: (str) =>
                prettier.format(str, {
                    parser: 'typescript',
                    ...prettierOptions,
                }),
        });

        // Generate in `handler-next` package
        await generate({
            connectionString:
                'postgresql://postgres:postgres@localhost:5432/postgres',
            includeSchemas: ['public'],
            defaultSchema: 'public',
            outDir: '../handler-next/src/tests/generated',
            formatter: (str) =>
                prettier.format(str, {
                    parser: 'typescript',
                    ...prettierOptions,
                }),
        });

        // Generate in `queries` package
        await generate({
            connectionString:
                'postgresql://postgres:postgres@localhost:5432/postgres',
            includeSchemas: ['public'],
            defaultSchema: 'public',
            outDir: '../queries/src/generated',
            formatter: (str) =>
                prettier.format(str, {
                    parser: 'typescript',
                    ...prettierOptions,
                }),
            SECRET_INTERNALS_DO_NOT_USE_queriesImportLocation: '../index',
        });

        // Generate in `react` package
        await generate({
            connectionString:
                'postgresql://postgres:postgres@localhost:5432/postgres',
            includeSchemas: ['public'],
            defaultSchema: 'public',
            outDir: '../react/src/test/generated',
            formatter: (str) =>
                prettier.format(str, {
                    parser: 'typescript',
                    ...prettierOptions,
                }),
        });
    }, 100_000);

    test('Add to Pagila', async () => {
        await deleteData();

        await createTable();

        await insertData();

        for (const [name, value] of Object.entries(await selectData())) {
            console.log({
                'Name:': name,
                'Value:': value,
                'JS primitive type': typeof value,
            });
        }

        await deleteData();
    }, 100_000);
});

const createTable = async () => {
    try {
        await client.connect();

        await client.query(createTableQuery);

        console.log('Table created successfully!');
    } catch (err) {
        console.error('Error creating table', err);
    }
};

const insertData = async () => {
    try {
        await client.connect();

        await client.query(insertTableQuery);

        console.log(`Record inserted successfully!`);
    } catch (err) {
        console.error('Error inserting record', err);
    }
};

const selectData = async () => {
    try {
        await client.connect();

        const results = await client.query(selectTableQuery);

        console.log(`Record found successfully!`);

        return results.rows[0];
    } catch (err) {
        console.error('Error finding record', err);
    }
};

const deleteData = async () => {
    try {
        await client.connect();

        const results = await client.query(deleteTableQuery);

        console.log(`Table deleted successfully!`);

        return results.rows[0];
    } catch (err) {
        console.error('Error deleting table', err);
    }
};
