import { generate } from '@synthql/introspect';
import { CliConfig } from '../../types/CliConfig';
import { createTableDefTransformers } from '../../validators/createTableDefTransformers';

interface GenerateSchemaOptions extends CliConfig {
    connectionString: string;
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
        tableDefTransformers: createTableDefTransformers(schemaDefOverrides),
        outDir: out,
    });
};
