import { describe, expect, test } from 'vitest';
import { generate } from '.';
import * as prettier from 'prettier';

describe('e2e', () => {
    test('Generate from Pagila', async () => {
        const prettierOptions = await prettier.resolveConfig(
            '../../.prettier.config.js',
        );

        expect(prettierOptions).not.toBe(null);

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
            SECRET_INTERNALS_DO_NOT_USE_queriesImportLocation: '../query',
        });
    }, 100_000);
});
