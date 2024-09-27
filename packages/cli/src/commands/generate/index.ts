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
    tablesAndViews = [],
    schemaDefOverrides,
}: GenerateSchemaOptions) => {
    return await generate({
        defaultSchema,
        connectionString,
        includeSchemas: schemas,
        includeTablesAndViews: tablesAndViews,
        tableOrViewDefTransformers:
            createTableOrViewDefTransformers(schemaDefOverrides),
        outDir: out,
    });
};
