import { describe, expect, it } from 'vitest';

import { cli } from './cli';

describe('cli', () => {
    describe(
        '1',
        () => {
            it('Generate schema types with the CLI options default values', async () => {
                const argv = ['node', 'index.js', 'generate'];

                const output = await cli(argv).parse();

                // Verify the output is correct
                expect(output).toBeDefined();
            });
        },
        {
            timeout: 20000,
        },
    );

    describe('2', () => {
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

                // Verify the output is correct
                expect(output).toBeDefined();
            },
            {
                timeout: 20000,
            },
        );
    });

    describe('3', () => {
        it(
            `Generate schema types with a supplied connection string option, using the option's alias, --url`,
            async () => {
                const url =
                    'postgres://postgres:postgres@localhost:5432/postgres';

                const argv = ['node', 'index.js', 'generate', `--url=${url}`];

                const output = await cli(argv).parse();

                // Verify the output is correct
                expect(output).toBeDefined();
            },
            {
                timeout: 20000,
            },
        );
    });

    describe('4', () => {
        it(
            `Generate schema types with a supplied output directory option, --out`,
            async () => {
                const out = 'src/generated/synthql/tests';

                const argv = ['node', 'index.js', 'generate', `--out=${out}`];

                const output = await cli(argv).parse();

                // Verify the output is correct
                expect(output).toBeDefined();
            },
            {
                timeout: 20000,
            },
        );
    });

    describe('5', () => {
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

                // Verify the output is correct
                expect(output).toBeDefined();
            },
            {
                timeout: 20000,
            },
        );
    });

    describe('6', () => {
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

                // Verify the output is correct
                expect(output).toBeDefined();
            },
            {
                timeout: 20000,
            },
        );
    });

    describe('7', () => {
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

                // Verify the output is correct
                expect(output).toBeDefined();
            },
            {
                timeout: 20000,
            },
        );
    });
});
