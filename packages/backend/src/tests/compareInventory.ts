import { DB } from './generated';
import { TableTypes } from './getTableTypes';

type I = DB['inventory']['columns'];

type Inventory = TableTypes<I>;

export const compareInventory = (a: Inventory, b: Inventory) => {
    return a.inventory_id - b.inventory_id;
};
