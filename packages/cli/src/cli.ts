import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generate } from './commands/generate';

export function cli(argv: string[]) {
    return yargs(hideBin(argv)).command(
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
                        'The path to the folder where the generated files will be created.',
                    default: 'src/generated/synthql',
                })
                .option('defaultSchema', {
                    type: 'string',
                    description:
                        'Default schema to be included in the generation',
                })
                .option('schemas', {
                    type: 'string',
                    description:
                        'List of schemas to be included in the generation',
                })
                .array('schemas');
        },
        async (argv) => {
            await generate({
                connectionString: argv.connectionString,
                out: argv.out,
                defaultSchema: argv.defaultSchema,
                schemas: argv.schemas,
            });
        },
    );
}
