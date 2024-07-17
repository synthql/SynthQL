import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generateSchema } from './commands/generate';

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
                    .config('configFile')
                    .parserConfiguration({
                        'dot-notation': false,
                        'strip-aliased': true,
                    });
            },
            async (argv) => {
                console.warn('Connecting to database schema...');

                const result = await generateSchema({
                    connectionString: argv.connectionString,
                    out: argv.out,
                    defaultSchema: argv.defaultSchema,
                    schemas: argv.schemas,
                    tables: argv.tables,
                    schemaDefOverrides: argv.schemaDefOverrides,
                });

                // TODO: We want to check if there were any overrides passed
                // TODO: that were not applied, and inform the user accordingly

                const tables = Object.keys(result.schema.properties ?? {});

                console.warn(`Generated schema with ${tables.length} table(s)`);

                for (const table of tables) {
                    console.warn(`- ${table}`);
                }

                exit(0);
            },
        )
        .help()
        .demandCommand(1)
        .parse();
}
