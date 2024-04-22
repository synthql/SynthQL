#!/usr/bin/env node
'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const yargs_1 = __importDefault(require('yargs'));
const helpers_1 = require('yargs/helpers');
const generate_1 = require('./commands/generate');
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
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
        (argv) =>
            __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, generate_1.generate)({
                    connectionString: argv.connectionString,
                    out: argv.out,
                    defaultSchema: argv.defaultSchema,
                    schemas: argv.schemas,
                });
                console.info(result);
            }),
    )
    .array('schemas')
    .help()
    .demandCommand(1)
    .parse();
//# sourceMappingURL=index.js.map
