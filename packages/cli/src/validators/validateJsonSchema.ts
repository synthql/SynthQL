import { Draft07 } from 'json-schema-library';

import synthqlJsonSchema from './synthql.config.json';

export function validateJsonSchema(schemaDefOverrides: unknown) {
    const jsonSchema = new Draft07(synthqlJsonSchema);

    return jsonSchema.validate(schemaDefOverrides);
}
