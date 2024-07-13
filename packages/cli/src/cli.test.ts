import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    vitest,
} from 'vitest';
import fs from 'fs';

import { cli } from './cli';
import { randomUUID } from 'crypto';
import path from 'path';

describe('CLI tests', () => {
    describe('`generate` command tests', () => {
        const url = 'postgres://postgres:postgres@localhost:5432/postgres';
        const out = 'generated/synthql/tests';
        const defaultSchema = 'public';
        const schemas = ['public'];
        const tables = ['actor', 'customer'];

        beforeAll(() => {
            fs.rmSync(out, {
                force: true,
                recursive: true,
            });
        });

        beforeEach(() => {
            vitest.resetModules();
            vitest.resetAllMocks();
        });

        it(
            `Generate schema types with the CLI options default values,
             with the exception of the --out option set`,
            async () => {
                const argv = [
                    'node',
                    'generate-default.js',
                    'generate',
                    `--out=${out}`,
                ];

                // Compose file path
                const outFilePath = path.join(out, `db.ts`);

                // Check that file with the name doesn't exist yet
                expect(!fs.existsSync(outFilePath)).toEqual(true);

                // Generate schema file
                const output = await cli({ argv, exit: () => {} });

                // Check that the file now exists
                expect(fs.existsSync(outFilePath)).toEqual(true);

                // Verify that the command passed is correct
                expect(output._).toEqual(['generate']);
            },
            {
                timeout: 10000,
            },
        );

        it(
            `Generate schema types with a supplied connection string, --connectionString`,
            async () => {
                const outDir = `${out}/${Date.now()}-${randomUUID()}`;

                const argv = [
                    'node',
                    'generate-with-connection-string.js',
                    'generate',
                    `--connectionString=${url}`,
                    `--out=${outDir}`,
                ];

                // Compose file path
                const outFilePath = path.join(outDir, `db.ts`);

                // Check that file with the name doesn't exist yet
                expect(!fs.existsSync(outFilePath)).toEqual(true);

                // Generate schema file
                const output = await cli({ argv, exit: () => {} });

                // Check that the file now exists
                expect(fs.existsSync(outFilePath)).toEqual(true);

                // Verify that the option data is correct
                expect(output.connectionString).toEqual(url);
            },
            {
                timeout: 10000,
            },
        );

        it(
            `Generate schema types with a supplied connection string option, using the option's alias, --url`,
            async () => {
                const outDir = `${out}/${Date.now()}-${randomUUID()}`;

                const argv = [
                    'node',
                    'generate-with-connection-string-alias.js',
                    'generate',
                    `--url=${url}`,
                    `--out=${outDir}`,
                ];

                // Compose file path
                const outFilePath = path.join(outDir, `db.ts`);

                // Check that file with the name doesn't exist yet
                expect(!fs.existsSync(outFilePath)).toEqual(true);

                // Generate schema file
                const output = await cli({ argv, exit: () => {} });

                // Check that the file now exists
                expect(fs.existsSync(outFilePath)).toEqual(true);

                // Verify that the option data is correct
                expect(output.url).toEqual(url);
            },
            {
                timeout: 10000,
            },
        );

        it(
            `Generate schema types with a supplied output directory option, --out`,
            async () => {
                const outDir = `${out}/${Date.now()}-${randomUUID()}`;

                const argv = [
                    'node',
                    'generate-with-output-directory.js',
                    'generate',
                    `--out=${outDir}`,
                ];

                // Compose file path
                const outFilePath = path.join(outDir, `db.ts`);

                // Check that file with the name doesn't exist yet
                expect(!fs.existsSync(outFilePath)).toEqual(true);

                // Generate schema file
                const output = await cli({ argv, exit: () => {} });

                // Check that the file now exists
                expect(fs.existsSync(outFilePath)).toEqual(true);

                // Verify that the option data is correct
                expect(output.out).toEqual(outDir);
            },
            {
                timeout: 10000,
            },
        );

        it(
            `Generate schema types with a supplied default schema option, --defaultSchema`,
            async () => {
                const outDir = `${out}/${Date.now()}-${randomUUID()}`;

                const argv = [
                    'node',
                    'generate-with-default-schema.js',
                    'generate',
                    `--defaultSchema=${defaultSchema}`,
                    `--out=${outDir}`,
                ];

                // Compose file path
                const outFilePath = path.join(outDir, `db.ts`);

                // Check that file with the name doesn't exist yet
                expect(!fs.existsSync(outFilePath)).toEqual(true);

                // Generate schema file
                const output = await cli({ argv, exit: () => {} });

                // Check that the file now exists
                expect(fs.existsSync(outFilePath)).toEqual(true);

                // Verify that the option data is correct
                expect(output.defaultSchema).toEqual(defaultSchema);
            },
            {
                timeout: 10000,
            },
        );

        it(
            `Generate schema types with a supplied schemas array, --schemas`,
            async () => {
                const outDir = `${out}/${Date.now()}-${randomUUID()}`;

                const argv = [
                    'node',
                    'generate-with-schemas.js',
                    'generate',
                    `--out=${outDir}`,
                    '--schemas',
                    ...schemas,
                ];

                // Compose file path
                const outFilePath = path.join(outDir, `db.ts`);

                // Check that file with the name doesn't exist yet
                expect(!fs.existsSync(outFilePath)).toEqual(true);

                // Generate schema file
                const output = await cli({ argv, exit: () => {} });

                // Check that the file now exists
                expect(fs.existsSync(outFilePath)).toEqual(true);

                // Verify that the option data is correct
                expect(output.schemas).toEqual(schemas);
            },
            {
                timeout: 10000,
            },
        );

        it(
            `Generate schema types with a supplied tables array, --tables`,
            async () => {
                const outDir = `${out}/${Date.now()}-${randomUUID()}`;

                const argv = [
                    'node',
                    'generate-with-schemas.js',
                    'generate',
                    `--out=${outDir}`,
                    '--tables',
                    ...tables,
                ];

                // Compose file path
                const outFilePath = path.join(outDir, `db.ts`);

                // Check that file with the name doesn't exist yet
                expect(!fs.existsSync(outFilePath)).toEqual(true);

                // Generate schema file
                const output = await cli({ argv, exit: () => {} });

                // Check that the file now exists
                expect(fs.existsSync(outFilePath)).toEqual(true);

                // Verify that the option data is correct
                expect(output.tables).toEqual(tables);
            },
            {
                timeout: 10000,
            },
        );

        it(
            `Generate schema types with a supplied schemas and tables arrays, --schemas --tables`,
            async () => {
                const outDir = `${out}/${Date.now()}-${randomUUID()}`;

                const argv = [
                    'node',
                    'generate-with-schemas.js',
                    'generate',
                    `--out=${outDir}`,
                    '--schemas',
                    ...schemas,
                    '--tables',
                    ...tables,
                ];

                // Compose file path
                const outFilePath = path.join(outDir, `db.ts`);

                // Check that file with the name doesn't exist yet
                expect(!fs.existsSync(outFilePath)).toEqual(true);

                // Generate schema file
                const output = await cli({ argv, exit: () => {} });

                // Check that the file now exists
                expect(fs.existsSync(outFilePath)).toEqual(true);

                // Verify that the --schemas option data is correct
                expect(output.schemas).toEqual(schemas);

                // Verify that the --tables option data is correct
                expect(output.tables).toEqual(tables);
            },
            {
                timeout: 10000,
            },
        );

        it(
            `Generate schema types with all options supplied`,
            async () => {
                const outDir = `${out}/${Date.now()}-${randomUUID()}`;

                const argv = [
                    'node',
                    'generate.js',
                    'generate',
                    `--connectionString=${url}`,
                    `--out=${outDir}`,
                    `--defaultSchema=${defaultSchema}`,
                    '--schemas',
                    ...schemas,
                    '--tables',
                    ...tables,
                ];

                // Compose file path
                const outFilePath = path.join(outDir, `db.ts`);

                // Check that file with the name doesn't exist yet
                expect(!fs.existsSync(outFilePath)).toEqual(true);

                // Generate schema file
                const output = await cli({ argv, exit: () => {} });

                // Check that the file now exists
                expect(fs.existsSync(outFilePath)).toEqual(true);

                // Verify that the options data passed is correct
                expect(output.connectionString).toEqual(url);
                expect(output.url).toEqual(url);
                expect(output.out).toEqual(outDir);
                expect(output.defaultSchema).toEqual(defaultSchema);
                expect(output.schemas).toEqual(schemas);
                expect(output.tables).toEqual(tables);
            },
            {
                timeout: 10000,
            },
        );

        afterAll(() => {
            fs.rmSync(out, {
                force: true,
                recursive: true,
            });
        });
    });
});
