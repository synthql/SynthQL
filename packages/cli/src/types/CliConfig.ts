import { SchemaDefOverrides } from '@synthql/queries';

export interface CliConfig {
    out?: string;
    defaultSchema?: string;
    schemas?: Array<string>;
    tables?: Array<string>;
    schemaDefOverrides?: SchemaDefOverrides;
}
