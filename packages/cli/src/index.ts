#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generate } from './commands/generate';

yargs(hideBin(process.argv))
    .command(
        'generate',
        'Generate a schema file from supplied database connection URL',
        {
            connectionString: {
                description:
                    'Connection URL to the database to generate a schema from',
                alias: 'url',
                default: 'postgres://postgres:postgres@localhost:5432/postgres',
            },
            out: {
                description: 'Output directory of the generated schema file',
                default: 'src',
            },
            defaultSchema: {
                description: 'Default schema to be included in the generation',
                default: 'public',
            },
            schemas: {
                description: 'List of schemas to be included in the generation',
                default: ['public'],
            },
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
