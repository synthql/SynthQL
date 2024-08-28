import { ColumnDefProperties } from '@synthql/queries';
import { SchemaDefOverrides } from '../types/CliConfig';
import {
    TableColumn,
    TableDetails,
    ViewColumn,
    ViewDetails,
} from 'extract-pg-schema';

interface TableDefTransformer {
    test: (tableDetails: TableDetails | ViewDetails) => boolean;
    transform: (
        tableColumn: TableColumn | ViewColumn,
    ) => Partial<ColumnDefProperties>;
}

export function createTableDefTransformers(
    schemaDefOverrides?: SchemaDefOverrides,
): Array<TableDefTransformer> {
    return Object.entries(schemaDefOverrides ?? {}).map(
        ([qualifiedTableName, tableDefOverrides]) => ({
            test: (tableDetails) =>
                qualifiedTableName ===
                `${tableDetails.schemaName}.${tableDetails.name}`,
            transform: (tableColumn) => tableDefOverrides[tableColumn.name],
        }),
    );
}
