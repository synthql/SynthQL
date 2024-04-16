#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generate } from './commands/generate';

yargs(hideBin(process.argv))
    .command(
        'generate',
        'Generate a schema from supplied database connection URL',
        {
            connectionString: {
                alias: 'url',
                default: 'postgres://postgres:postgres@localhost:5432/postgres',
            },
            outputDir: {
                alias: 'out',
                default: 'src',
            },
            defaultSchema: {
                alias: 'default',
                default: 'public',
            },
            schemas: {
                default: ['public'],
            },
        },
        async (argv) => {
            const result = await generate({
                connectionString: argv.connectionString,
                outputDir: argv.outputDir,
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
