import yargs from 'yargs';
import fs from 'fs';
import { hideBin } from 'yargs/helpers';
import { generateSchema } from './commands/generate';
import { findUnusedSchemaOverrides } from './validators/findUnusedSchemaOverrides';
import {
    validateSchemaDefOverrides,
    validateConfigFile,
} from './validators/validators';

export function cli({
    argv,
    exit,
}: {
    argv: string[];
    exit: (statusCode: number) => void;
}) {
    return yargs(hideBin(argv))
        .command(
            'generate',
            'Generate a schema file from supplied database connection URL',
            (yargs) => {
                return yargs
                    .option('connectionString', {
                        type: 'string',
                        description:
                            'Connection URL to the database to generate a schema from',
                        alias: 'url',
                        default:
                            'postgres://postgres:postgres@localhost:5432/postgres',
                    })
                    .option('out', {
                        type: 'string',
                        description:
                            'Path to the folder where the generated files will be created',
                        default: 'src/generated/synthql',
                    })
                    .option('defaultSchema', {
                        type: 'string',
                        description:
                            'Default schema to be included in the generation',
                        default: 'public',
                    })
                    .option('schemas', {
                        type: 'string',
                        description:
                            'List of schemas to be included in the generation',
                        default: 'public',
                    })
                    .array('schemas')
                    .option('tables', {
                        type: 'string',
                        description:
                            'List of tables to be included in the generation',
                    })
                    .array('tables')
                    .config('configFile', function (configPath) {
                        const data = JSON.parse(
                            fs.readFileSync(configPath, 'utf-8'),
                        );

                        if (!validateConfigFile(data)) {
                            throw new Error(
                                [
                                    `Config file at path '${configPath}' does not match the schema:`,
                                    ...(validateConfigFile.errors?.map(
                                        (error) =>
                                            JSON.stringify(error, null, 2),
                                    ) ?? []),
                                ].join('\n'),
                            );
                        }

                        return data;
                    })
                    .parserConfiguration({
                        'dot-notation': false,
                        'strip-aliased': true,
                    });
            },
            async (argv) => {
                console.info('Connecting to database schema...');

                if (
                    argv.schemaDefOverrides !== undefined &&
                    !validateSchemaDefOverrides(argv.schemaDefOverrides)
                ) {
                    throw new Error(
                        [
                            `Schema definition overrides does not match the validation schema:`,
                            ...(validateSchemaDefOverrides.errors?.map(
                                (error) => JSON.stringify(error, null, 2),
                            ) ?? []),
                        ].join('\n'),
                    );
                }

                const result = await generateSchema({
                    connectionString: argv.connectionString,
                    out: argv.out,
                    defaultSchema: argv.defaultSchema,
                    schemas: argv.schemas,
                    tables: argv.tables,
                    schemaDefOverrides: argv.schemaDefOverrides,
                });

                const tables = Object.keys(result.schema.properties ?? {});
                console.info(
                    `Generated schema with ${tables.length} table(s):`,
                );

                for (const table of tables) {
                    console.info(`- ${table}`);
                }

                const unusedSchemaOverrides = findUnusedSchemaOverrides(
                    tables,
                    argv.defaultSchema,
                    argv.schemaDefOverrides,
                );

                if (unusedSchemaOverrides.length > 0) {
                    const lines = [
                        '',
                        `Could not apply schema overrides for the following table(s):`,
                        ...unusedSchemaOverrides.map(
                            (qualifiedTableName) => `- ${qualifiedTableName}`,
                        ),
                        '',
                        'If you are using the `--schemas` and/or `--tables` option',
                        'via the CLI, ensure that you are passing the correct names',
                        `of the schemas and tables these overrides are for`,
                        '',
                    ];

                    console.warn(lines.join('\n'));
                }

                exit(0);
            },
        )
        .help()
        .demandCommand(1)
        .parse();
}
