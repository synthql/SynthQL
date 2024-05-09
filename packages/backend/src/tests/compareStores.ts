import { DB } from './generated';
import { ColumnDataTypes } from './getColumnDataTypes';

type SelectedStoreColumnDataTypes = Pick<
    ColumnDataTypes<DB['store']['columns']>,
    'store_id'
>;

export const compareStores = (
    a: SelectedStoreColumnDataTypes,
    b: SelectedStoreColumnDataTypes,
) => {
    // Q: does this compare ascending or descending?
    return a.store_id - b.store_id;
};
