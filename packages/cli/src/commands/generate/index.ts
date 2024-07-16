import { SchemaDefOverrides } from '@synthql/queries';
import { generate } from '@synthql/introspect';
import path from 'path';

interface GenerateSchemaOptions {
    connectionString: string;
    out: string;
    defaultSchema: string;
    schemas: string[];
    tables?: string[];
    schemaDefOverrides?: unknown;
}

export const generateSchema = async ({
    connectionString,
    out,
    defaultSchema,
    schemas = [],
    tables = [],
    schemaDefOverrides,
}: GenerateSchemaOptions) => {
    if (schemaDefOverrides === undefined) {
        try {
            await generate({
                defaultSchema,
                connectionString,
                includeSchemas: schemas,
                includeTables: tables,
                outDir: path.resolve(path.join(process.cwd(), out)),
            });
        } catch (error) {
            console.log('Error: ', JSON.stringify(error, null, 2));
        }
    } else if (isValidSchemaDefOverrides(schemaDefOverrides)) {
        try {
            await generate({
                defaultSchema,
                connectionString,
                includeSchemas: schemas,
                includeTables: tables,
                schemaDefOverrides,
                outDir: path.resolve(path.join(process.cwd(), out)),
            });
        } catch (error) {
            console.log('Error: ', JSON.stringify(error, null, 2));
        }
    } else {
        const lines = [
            'Invalid shape of schema def overrides:',
            '',
            `${JSON.stringify(schemaDefOverrides, null, 2)}`,
        ];

        console.log(lines.join('\n'));
    }
};

function isValidSchemaDefOverrides(value: any): value is SchemaDefOverrides {
    return value satisfies SchemaDefOverrides;
}
