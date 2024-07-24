import { ColumnDefProperties } from '@synthql/queries';
import { SchemaDefOverrides } from '../types/CliConfig';
import { TableColumn, TableDetails } from 'extract-pg-schema';

interface TableDefTransformer {
    test: (tableDetails: TableDetails) => boolean;
    transform: (tableColumn: TableColumn) => Partial<ColumnDefProperties>;
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
