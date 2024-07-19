import { ColumnDefProperties, SchemaDefOverrides } from '@synthql/queries';

const columnDefProperties: ColumnDefProperties = {
    type: { type: '', id: '', description: '' },
    selectable: { type: 'boolean', const: false },
    includable: { type: 'boolean', const: false },
    whereable: { type: 'boolean', const: false },
    nullable: { type: 'boolean', const: false },
    isPrimaryKey: { type: 'boolean', const: false },
};

const columnDefPropertyKeys = Object.keys(columnDefProperties);

export function isValidSchemaDefOverrides(
    value: unknown,
): value is SchemaDefOverrides | undefined {
    if (isObject(value)) {
        for (const [tableDefName, tableDefOverride] of Object.entries(value)) {
            if (containsSingleDot(tableDefName)) {
                if (isObject(tableDefOverride)) {
                    for (const [
                        columnDefName,
                        columnDefOverride,
                    ] of Object.entries(tableDefOverride)) {
                        if (isObject(columnDefOverride)) {
                            for (const [
                                columnDefPropertyName,
                                columnDefPropertyDef,
                            ] of Object.entries(columnDefOverride)) {
                                if (
                                    columnDefPropertyKeys.includes(
                                        columnDefPropertyName,
                                    )
                                ) {
                                    if (isObject(columnDefPropertyDef)) {
                                        // TODO: We can still refine, narrow this down further
                                        return true;
                                    } else {
                                        const lines = [
                                            `The value passed for the ${columnDefPropertyName} column property`,
                                            `for the ${columnDefName} column`,
                                            `in the ${tableDefName} table`,
                                            'in `schemaDefOverrides`, is not a valid',
                                            'non-null, non-array JS object!',
                                        ];

                                        throw new Error(lines.join('\n'));
                                    }
                                } else {
                                    const lines = [
                                        `The column property key ${columnDefPropertyName} is not a valid column property key`,
                                        '',
                                        'The column property keys should be one of the following:',
                                        ...columnDefPropertyKeys,
                                    ];

                                    throw new Error(lines.join('\n'));
                                }
                            }
                        } else {
                            const lines = [
                                `The value passed for the ${columnDefName} column`,
                                `in the ${tableDefName} table`,
                                'in `schemaDefOverrides`, is not a valid',
                                'non-null, non-array JS object!',
                            ];

                            throw new Error(lines.join('\n'));
                        }
                    }
                } else {
                    const lines = [
                        `The value passed for the ${tableDefName} table`,
                        'in `schemaDefOverrides`, is not a valid',
                        'non-null, non-array JS object!',
                    ];

                    throw new Error(lines.join('\n'));
                }
            } else {
                const lines = [
                    `The table key ${tableDefName} is not a valid dot-notation string!`,
                    '',
                    'The table keys should be of the string shape: "${schemaName}.${tableName}"',
                ];

                throw new Error(lines.join('\n'));
            }
        }
    } else if (value === undefined) {
        return true;
    } else {
        const lines = [
            'The value passed for `schemaDefOverrides` is',
            'not a valid non-null, non-array JS object!',
        ];

        throw new Error(lines.join('\n'));
    }

    return false;
}

export function isObject(value: unknown): value is object {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function containsSingleDot(input: string): boolean {
    // Regular expression to match a string containing exactly one dot
    const regex = /^[^.]+\.[^.]+$/;

    return regex.test(input);
}
