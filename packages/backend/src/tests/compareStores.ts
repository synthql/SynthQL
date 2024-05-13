import { DB } from './generated';
import { TableTypes } from './getTableTypes';

type S = DB['store']['columns'];

type Store = Pick<TableTypes<S>, 'store_id'>;

export const compareStores = (a: Store, b: Store) => {
    // Q: does this compare ascending or descending?
    return a.store_id - b.store_id;
};
