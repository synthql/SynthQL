import { SchemaDefOverrides } from '@synthql/queries';

export interface CliConfig {
    $schema?: string;
    out: string;
    defaultSchema: string;
    schemas: Array<string>;
    tables?: Array<string>;
    schemaDefOverrides?: SchemaDefOverrides;
}
