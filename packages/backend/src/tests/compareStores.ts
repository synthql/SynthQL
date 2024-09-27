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
    return a.store_id - b.store_id;
};
