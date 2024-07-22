import yargs from 'yargs';
import fs from 'fs';
import { hideBin } from 'yargs/helpers';
import { generateSchema } from './commands/generate';
import { getUnappliedSchemaOverridesTableNames } from './validators/getUnappliedSchemaOverridesTableNames';
import { validateCliArgv, validateConfigFile } from './validators/validators';

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
                            'Path to the folder where the generated files will be created.',
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
                                    ...(validateConfigFile.errors ?? []),
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
                console.warn('Connecting to database schema...');

                // We do this so that we lose the types from yargs but we gain
                // complete type-safety after we pass the data through the validator
                const data = { ...argv, connectionString: undefined } as any;

                if (validateCliArgv(data)) {
                    const result = await generateSchema({
                        connectionString: argv.connectionString,
                        out: data.out,
                        defaultSchema: data.defaultSchema,
                        schemas: data.schemas,
                        tables: data.tables,
                        schemaDefOverrides: data.schemaDefOverrides,
                    });

                    const tables = Object.keys(result.schema.properties ?? {});

                    console.warn(
                        `Generated schema with ${tables.length} table(s):`,
                    );

                    for (const table of tables) {
                        console.info(`- ${table}`);
                    }

                    const unappliedSchemaOverrideTableKeys =
                        getUnappliedSchemaOverridesTableNames(
                            tables,
                            data.defaultSchema,
                            data.schemaDefOverrides,
                        );

                    if (unappliedSchemaOverrideTableKeys.length > 0) {
                        const lines = [
                            '',
                            `Could not apply schema overrides for the following table(s):`,
                            ...unappliedSchemaOverrideTableKeys,
                            '',
                            'If you are using the `--schemas` and/or `--tables` option via the CLI, ensure that',
                            `you are passing the correct names of the schemas and tables these overrides are for`,
                            '',
                        ];

                        console.warn(lines.join('\n'));
                    }
                } else {
                    throw new Error(validateCliArgv.errors?.join('\n'));
                }

                exit(0);
            },
        )
        .help()
        .demandCommand(1)
        .parse();
}
