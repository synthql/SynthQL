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
            if (containsSingleDot(tableDefName) && isObject(tableDefOverride)) {
                for (const columnDefOverride of Object.values(
                    tableDefOverride,
                )) {
                    if (isObject(columnDefOverride)) {
                        for (const [
                            columnDefPropertyName,
                            columnDefPropertyDef,
                        ] of Object.entries(columnDefOverride)) {
                            if (
                                columnDefPropertyKeys.includes(
                                    columnDefPropertyName,
                                ) &&
                                isObject(columnDefPropertyDef)
                            ) {
                                return true;
                                // TODO: We can still refine, narrow this down further
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
    } else if (value === undefined) {
        return true;
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
