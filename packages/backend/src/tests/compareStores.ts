import { DB } from './generated.schema';

type Store = DB['public.store'];

export const compareStores = (a: Store, b: Store) => {
    // Q: does this compare ascending or descending?
    return a.store_id - b.store_id;
};
