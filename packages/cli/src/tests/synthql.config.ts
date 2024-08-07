import { CliConfig } from '../types/CliConfig';

export const config: CliConfig = {
    $schema: '../validators/synthql.config.json',
    out: 'src/generated/synthql',
    defaultSchema: 'public',
    schemas: ['public'],
    tables: ['actor', 'customer'],
    schemaDefOverrides: {
        'public.actor': {
            first_name: {
                includable: { type: 'boolean', const: false },
            },
            last_name: {
                includable: { type: 'boolean', const: false },
            },
        },
        'public.customer': {
            first_name: {
                includable: { type: 'boolean', const: false },
            },
            last_name: {
                includable: { type: 'boolean', const: false },
            },
        },
        'public.agents': {
            first_name: {
                includable: { type: 'boolean', const: false },
            },
            last_name: {
                includable: { type: 'boolean', const: false },
            },
        },
        'luminovo.agents': {
            first_name: {
                includable: { type: 'boolean', const: false },
            },
            last_name: {
                includable: { type: 'boolean', const: false },
            },
        },
    },
};
