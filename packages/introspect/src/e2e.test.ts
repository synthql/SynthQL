import { describe, test } from 'vitest';
import { generate } from '.';

describe('e2e', () => {
    test('generate from pagila', async () => {
        await generate({
            connectionString:
                'postgresql://postgres:postgres@localhost:5432/postgres',
            includeSchemas: ['public'],
            defaultSchema: 'public',
            outDir: './src/generated',
        });
    }, 100_000);
});
