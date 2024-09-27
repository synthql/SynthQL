import { ColumnDefProperties } from '@synthql/queries';
import { SchemaDefOverrides } from '../types/CliConfig';
import {
    TableColumn,
    TableDetails,
    ViewColumn,
    ViewDetails,
} from 'extract-pg-schema';

interface TableOrViewDefTransformer {
    test: (tableOrViewDetails: TableDetails | ViewDetails) => boolean;
    transform: (
        tableOrViewColumn: TableColumn | ViewColumn,
    ) => Partial<ColumnDefProperties>;
}

export function createTableOrViewDefTransformers(
    schemaDefOverrides?: SchemaDefOverrides,
): Array<TableOrViewDefTransformer> {
    return Object.entries(schemaDefOverrides ?? {}).map(
        ([qualifiedTableOrViewName, tableOrViewDefOverrides]) => ({
            test: (tableOrViewDetails) =>
                qualifiedTableOrViewName ===
                `${tableOrViewDetails.schemaName}.${tableOrViewDetails.name}`,
            transform: (tableOrViewColumn) =>
                tableOrViewDefOverrides[tableOrViewColumn.name],
        }),
    );
}
