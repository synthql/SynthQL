import { describe, expect, it } from 'vitest';

import { cli } from './cli';

describe('CLI tests', () => {
    describe('`generate` command tests', () => {
        it(
            'Generate schema types with the CLI options default values',
            async () => {
                const argv = ['node', 'index.js', 'generate'];

                const output = await cli(argv).parse();

                // Verify that the option data is correct
                expect(output._).toEqual(['generate']);
            },
            {
                timeout: 20000,
            },
        );

        it(
            `Generate schema types with a supplied connection string, --connectionString`,
            async () => {
                const url =
                    'postgres://postgres:postgres@localhost:5432/postgres';

                const argv = [
                    'node',
                    'index.js',
                    'generate',
                    `--connectionString=${url}`,
                ];

                const output = await cli(argv).parse();

                // Verify that the option data is correct
                expect(output.connectionString).toEqual(url);
            },
            {
                timeout: 20000,
            },
        );

        it(
            `Generate schema types with a supplied connection string option, using the option's alias, --url`,
            async () => {
                const url =
                    'postgres://postgres:postgres@localhost:5432/postgres';

                const argv = ['node', 'index.js', 'generate', `--url=${url}`];

                const output = await cli(argv).parse();

                // Verify that the option data is correct
                expect(output.url).toEqual(url);
            },
            {
                timeout: 20000,
            },
        );

        it(
            `Generate schema types with a supplied output directory option, --out`,
            async () => {
                const out = 'src/generated/synthql/tests';

                const argv = ['node', 'index.js', 'generate', `--out=${out}`];

                const output = await cli(argv).parse();

                // Verify that the option data is correct
                expect(output.out).toEqual(out);
            },
            {
                timeout: 20000,
            },
        );

        it(
            `Generate schema types with a supplied default schema option, --defaultSchema`,
            async () => {
                const defaultSchema = 'pg_catalog';

                const argv = [
                    'node',
                    'index.js',
                    'generate',
                    `--defaultSchema=${defaultSchema}`,
                ];

                const output = await cli(argv).parse();

                // Verify that the option data is correct
                expect(output.defaultSchema).toEqual(defaultSchema);
            },
            {
                timeout: 20000,
            },
        );

        it(
            `Generate schema types with a supplied schemas array, --schemas`,
            async () => {
                const schemas = ['pg_catalog'];

                const argv = [
                    'node',
                    'index.js',
                    'generate',
                    '--schemas',
                    ...schemas,
                ];

                const output = await cli(argv).parse();

                // Verify that the option data is correct
                expect(output.schemas).toEqual(schemas);
            },
            {
                timeout: 20000,
            },
        );

        it(
            `Generate schema types with all options supplied`,
            async () => {
                const url =
                    'postgres://postgres:postgres@localhost:5432/postgres';
                const out = 'src/generated/synthql/tests';
                const defaultSchema = 'pg_catalog';
                const schemas = ['pg_catalog'];

                const argv = [
                    'node',
                    'index.js',
                    'generate',
                    `--connectionString=${url}`,
                    `--out=${out}`,
                    `--defaultSchema=${defaultSchema}`,
                    '--schemas',
                    ...schemas,
                ];

                const output = await cli(argv).parse();

                // Verify that the option data passed is correct
                expect(output.connectionString).toEqual(url);
                expect(output.url).toEqual(url);
                expect(output.out).toEqual(out);
                expect(output.defaultSchema).toEqual(defaultSchema);
                expect(output.schemas).toEqual(schemas);
            },
            {
                timeout: 20000,
            },
        );
    });
});
