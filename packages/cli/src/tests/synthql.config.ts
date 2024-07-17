import { CliConfig } from '../types/CliConfig';

export const config: CliConfig = {
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
    },
};
