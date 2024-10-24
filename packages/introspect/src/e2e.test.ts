import { describe, expect, test } from 'vitest';
import * as prettier from 'prettier';
import { generate } from './generate';

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
            excludeTablesAndViews: ['all_data_types'],
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
            excludeTablesAndViews: ['all_data_types'],
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
            excludeTablesAndViews: ['all_data_types'],
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
            excludeTablesAndViews: ['all_data_types'],
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
            excludeTablesAndViews: ['all_data_types'],
            outDir: '../react/src/test/generated',
            formatter: (str) =>
                prettier.format(str, {
                    parser: 'typescript',
                    ...prettierOptions,
                }),
        });
    }, 100_000);
});
