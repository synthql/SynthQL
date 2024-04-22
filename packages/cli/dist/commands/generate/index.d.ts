interface GenerateSchemaOptions {
    connectionString: string;
    out?: string;
    defaultSchema?: string;
    schemas?: string[];
}
export declare const generate: ({
    connectionString,
    out,
    defaultSchema,
    schemas,
}: GenerateSchemaOptions) => Promise<string>;
export {};
