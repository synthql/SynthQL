import { DB } from "./generated.schema"

type Inventory = Pick<DB['public.inventory'], 'inventory_id'>

export const compareInventory = (a: Inventory, b: Inventory) => {
    // Q: does this compare ascending or descending?
    return a.inventory_id - b.inventory_id
}
