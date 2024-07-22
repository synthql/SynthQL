import path from 'path';
import { generate } from '@synthql/introspect';
import { SchemaDefOverrides } from '@synthql/queries';
import { createTableDefOverriderList } from '../../validators/createTableDefOverriderList';

interface GenerateSchemaOptions {
    connectionString: string;
    out: string;
    defaultSchema: string;
    schemas: string[];
    tables?: string[];
    schemaDefOverrides?: SchemaDefOverrides;
}

export const generateSchema = async ({
    connectionString,
    out,
    defaultSchema,
    schemas = [],
    tables = [],
    schemaDefOverrides,
}: GenerateSchemaOptions) => {
    return await generate({
        defaultSchema,
        connectionString,
        includeSchemas: schemas,
        includeTables: tables,
        tableDefOverriderList: createTableDefOverriderList(schemaDefOverrides),
        outDir: out,
    });
};
