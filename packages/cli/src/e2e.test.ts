import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    test,
    vitest,
} from 'vitest';
import * as prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import { configFileSchema } from './validators/schemas';
import { cli } from './cli';
import { randomUUID } from 'crypto';

describe('e2e', () => {
    const out = 'generated/synthql/e2e/tests';
    const configFile = 'src/tests/synthql.config.json';

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

    test('Write schema to files', async () => {
        const prettierOptions = await prettier.resolveConfig(
            '../../.prettier.config.js',
        );

        expect(prettierOptions).not.toBe(null);

        // Generate in `cli` package
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
        `Generate schema types with a supplied config file option, --configFile`,
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
            const schema = file.schema.properties;

            const schemaDefOverrides = output.schemaDefOverrides as any;

            for (const qualifiedTableName in schemaDefOverrides) {
                const [schemaName, tableName] = qualifiedTableName.split('.');

                if (schemaName === output.defaultSchema) {
                    const tableDef = schema[tableName];

                    if (tableDef) {
                        const tableDefColumnProperties =
                            schema[tableName].properties.columns.properties;

                        for (const columnName in tableDefColumnProperties) {
                            const columnDef =
                                tableDefColumnProperties[columnName].properties;

                            const columnDefOverride =
                                schemaDefOverrides[qualifiedTableName][
                                    columnName
                                ];

                            if (columnDefOverride) {
                                for (const attribute in columnDefOverride) {
                                    if (columnDef[attribute]) {
                                        expect(columnDef[attribute]).toEqual(
                                            columnDefOverride[attribute],
                                        );
                                    }
                                }
                            }
                        }
                    }
                } else {
                    const tableDef = schema[qualifiedTableName];

                    if (tableDef) {
                        const tableDefColumnProperties =
                            schema[qualifiedTableName].properties.columns
                                .properties;

                        for (const columnName in tableDefColumnProperties) {
                            const columnDef =
                                tableDefColumnProperties[columnName].properties;

                            const columnDefOverride =
                                schemaDefOverrides[qualifiedTableName][
                                    columnName
                                ];

                            if (columnDefOverride) {
                                for (const attribute in columnDefOverride) {
                                    if (columnDef[attribute]) {
                                        expect(columnDef[attribute]).toEqual(
                                            columnDefOverride[attribute],
                                        );
                                    }
                                }
                            }
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
