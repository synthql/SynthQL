import { TSchema } from '@sinclair/typebox';
import { Value, ValueError } from '@sinclair/typebox/value';

export function runSampledValidation({
    schema,
    sampleRate,
    rows,
}: {
    schema?: TSchema;
    sampleRate?: number;
    rows: unknown;
}) {
    if (sampleRate === undefined || schema === undefined) {
        return;
    }

    const shouldSample = Math.random() < sampleRate;
    if (!shouldSample) {
        return;
    }
    const error = Value.Errors(schema, rows).First();
    if (error) {
        throw new Error(formatError(error));
    }
}

function formatError(error: ValueError) {
    return [
        `Validation error at ${error.path}: ${error.message}`,
        `Actual: ${error.value}`,
        `Expected schema: ${error.schema}`,
    ].join('\n');
}
