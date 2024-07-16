import { CliConfig } from '../types/CliConfig';

export const config: CliConfig = {
    out: 'src/generated/synthql',
    defaultSchema: 'public',
    schemas: ['public'],
    tables: ['actor', 'customer'],
    schemaDefOverrides: {
        actor: {
            first_name: {
                includable: { type: 'boolean', const: false },
            },
            last_name: {
                includable: { type: 'boolean', const: false },
            },
        },
        customer: {
            first_name: {
                includable: { type: 'boolean', const: false },
            },
            last_name: {
                includable: { type: 'boolean', const: false },
            },
        },
    },
};
