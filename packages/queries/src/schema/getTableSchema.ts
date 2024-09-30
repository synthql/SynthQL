import { TSchema, TUnsafe, Type } from '@sinclair/typebox';
import { Schema } from '../types/Schema';
import { Select } from '../types/Select';
import { Table } from '../types/Table';
import { getColumnNamesAndDefs } from './getColumnNamesAndDefs';
import { getTableDef } from './getTableDef';
import { isSelectableColumn } from './isSelectableColumn';

export function getTableSchema<DB, TTable extends Table<DB>>(
    schema: Schema<DB>,
    table: TTable,
): TUnsafe<Select<DB, TTable>> {
    const tableDef = getTableDef(schema, table);

    const columns = getColumnNamesAndDefs(tableDef)
        // Only include selectable columns
        .filter(([_, columnDef]) => {
            return isSelectableColumn(columnDef);
        })
        .map(([columnName, columnDef]) => {
            return {
                [columnName]: convertToTypeBoxSchema(columnDef.properties.type),
            };
        })
        .reduce((acc, curr) => {
            return { ...acc, ...curr };
        }, {});

    return Type.Object(columns);
}

function convertToTypeBoxSchema(jsonSchema: any): TSchema {
    switch (jsonSchema.type) {
        case 'string':
            return Type.String(jsonSchema);
        case 'number':
            return Type.Number(jsonSchema);
        case 'integer':
            return Type.Integer(jsonSchema);
        case 'boolean':
            return Type.Boolean(jsonSchema);
        case 'object': {
            const properties = {};
            for (const key in jsonSchema.properties) {
                // @ts-ignore
                properties[key] = convertToTypeBoxSchema(
                    jsonSchema.properties[key],
                );
            }
            return Type.Object(properties);
        }
        case 'array':
            return Type.Array(convertToTypeBoxSchema(jsonSchema.items));
        default:
            throw new Error('Unsupported JSON Schema type');
    }
}
