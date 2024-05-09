import { DB } from './generated';
import { ColumnDataTypes } from './getColumnDataTypes';

type SelectedInventoryColumnDataTypes = Pick<
    ColumnDataTypes<DB['inventory']['columns']>,
    'inventory_id'
>;

export const compareInventory = (
    a: SelectedInventoryColumnDataTypes,
    b: SelectedInventoryColumnDataTypes,
) => {
    return a.inventory_id - b.inventory_id;
};
