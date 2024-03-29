import { DB } from './generated.schema';

type Inventory = Pick<DB['public.inventory'], 'inventory_id'>;

export const compareInventory = (a: Inventory, b: Inventory) => {
    return a.inventory_id - b.inventory_id;
};
