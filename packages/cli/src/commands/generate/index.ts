import { generate } from '@synthql/introspect';
import { CliConfig } from '../../types/CliConfig';
import { createTableOrViewDefTransformers } from '../../validators/createTableOrViewDefTransformers';

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
        includeTablesAndViews: tables,
        tableOrViewDefTransformers:
            createTableOrViewDefTransformers(schemaDefOverrides),
        outDir: out,
    });
};
