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
                    default: 'public',
                })
                .option('schemas', {
                    type: 'string',
                    description:
                        'List of schemas to be included in the generation',
                    default: 'public',
                })
                .array('schemas');
        },
        async (argv) => {
            await generateSchema({
                connectionString: argv.connectionString,
                out: argv.out,
                defaultSchema: argv.defaultSchema,
                schemas: argv.schemas,
            });

            exit(0);
        },
    );
}
