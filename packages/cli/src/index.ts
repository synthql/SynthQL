#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generate } from './commands/generate';

yargs(hideBin(process.argv))
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
                        'Output directory of the generated schema file',
                    default: 'src',
                })
                .option('defaultSchema', {
                    type: 'string',
                    description:
                        'Default schema to be included in the generation',
                })
                .option('schemas', {
                    description:
                        'List of schemas to be included in the generation',
                    default: [] as string[],
                });
        },
        async (argv) => {
            const result = await generate({
                connectionString: argv.connectionString,
                out: argv.out,
                defaultSchema: argv.defaultSchema,
                schemas: argv.schemas,
            });

            console.info(result);
        },
    )
    .array('schemas')
    .help()
    .demandCommand(1)
    .parse();
