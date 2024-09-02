import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import * as prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { cli } from './cli';
import { configFileSchema } from './validators/schemas';
import { validateSchemaDefOverrides } from './validators/validators';

describe('e2e', () => {
    const out = ' /tmp/synthql/e2e/tests';
    const configFile = 'src/tests/synthql.config.json';

    beforeAll(() => {
        fs.rmSync(out, {
            force: true,
            recursive: true,
        });
    });

    test('Write configuration file validation schema to files', async () => {
        const prettierOptions = await prettier.resolveConfig(
            '../../.prettier.config.js',
        );

        expect(prettierOptions).not.toBe(null);

        // Generate in `cli` package
        // This is a copy of the validation schema; it is used in
        // validating the CLI JSON config file used in the CLI tests
        const cliOutDir = '../cli/src/tests';

        if (!fs.existsSync(cliOutDir)) {
            fs.mkdirSync(cliOutDir, { recursive: true });
        }

        fs.writeFileSync(
            path.join(cliOutDir, 'synthql.dev.config.json'),
            await prettier.format(JSON.stringify(configFileSchema, null, 2), {
                parser: 'json',
                ...prettierOptions,
            }),
        );

        // Generate in `docs` package
        // This is a copy of the validation schema, exposed via
        // a public link from the documentation site, to be used
        // by users in composing their own CLI JSON config file
        const docsOutDir = '../docs/static/schemas';

        if (!fs.existsSync(docsOutDir)) {
            fs.mkdirSync(docsOutDir, { recursive: true });
        }

        fs.writeFileSync(
            path.join(docsOutDir, 'synthql.config.json'),
            await prettier.format(JSON.stringify(configFileSchema, null, 2), {
                parser: 'json',
                ...prettierOptions,
            }),
        );
    }, 100_000);

    test(
        `Test that the schema overrides are being applied`,
        async () => {
            const outDir = `${out}/${Date.now()}-${randomUUID()}`;

            const argv = [
                'node',
                'generate-with-default-schema.js',
                'generate',
                `--configFile=${configFile}`,
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
            expect(output.configFile).toEqual(configFile);

            // Verify that the passed attribute overrides were applied
            const schemaFilePath = path.join(outDir, `schema.ts`);
            const file = await import(schemaFilePath);
            const schema = file?.schema?.properties;

            if (!validateSchemaDefOverrides(output.schemaDefOverrides)) {
                throw new Error(
                    [
                        `Schema definition overrides does not match the validation schema:`,
                        ...(validateSchemaDefOverrides.errors?.map((error) =>
                            JSON.stringify(error, null, 2),
                        ) ?? []),
                    ].join('\n'),
                );
            }

            for (const [
                qualifiedTableName,
                tableDefOverrides,
            ] of Object.entries(output.schemaDefOverrides ?? {})) {
                const [schemaName, tableName] = qualifiedTableName.split('.');

                const isDefaultSchema = schemaName === output.defaultSchema;

                const tableToCheck = isDefaultSchema
                    ? tableName
                    : qualifiedTableName;

                for (const [columnName, columnDefOverrides] of Object.entries(
                    tableDefOverrides,
                )) {
                    for (const [
                        attributeName,
                        attributeDefOverrides,
                    ] of Object.entries(columnDefOverrides)) {
                        const attributeDef =
                            schema[tableToCheck]?.properties?.columns
                                ?.properties[columnName][attributeName];

                        if (attributeDef) {
                            expect(attributeDef).toEqual(attributeDefOverrides);
                        }
                    }
                }
            }
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
